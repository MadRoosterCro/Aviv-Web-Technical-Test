import { functionHandler } from "@/libs/function";
import { getRepository } from "@/repositories/listings";
import { Listing, ListingWrite } from "@/types.generated";
import { EntityNotFound, NotFound } from "@/libs/errors";

export const getListings = functionHandler<Listing[]>(
  async (_event, context) => {
    const listings = await getRepository(context.postgres).getAllListings();

    return { statusCode: 200, response: listings };
  }
);

export const addListing = functionHandler<Listing, ListingWrite>(
  async (event, context) => {
    const listing = await getRepository(context.postgres).insertListing(
      event.body
    );

    return { statusCode: 201, response: listing };
  }
);

export const updateListing = functionHandler<Listing, ListingWrite>(
  async (event, context) => {
    const listingId = parseInt(event.pathParameters.id);
    const updates = event.body;

    const repository = getRepository(context.postgres);

    try {
      const existingListing = await repository.getListing(listingId);

      if (
        updates.latest_price_eur &&
        updates.latest_price_eur !== existingListing.latest_price_eur
      ) {
        await repository.addPriceHistory(listingId, updates.latest_price_eur);
      }

      const updatedListing = await repository.updateListing(listingId, updates);

      console.warn(
        `PUT /listings/${listingId} is deprecated. Please use PATCH instead.`
      );

      return { statusCode: 200, response: updatedListing };
    } catch (e) {
      if (e instanceof EntityNotFound) {
        throw new NotFound(e.message);
      }
      throw e;
    }
  }
);

export const patchListing = functionHandler<
  Listing | { message: string },
  Partial<ListingWrite>
>(async (event, context) => {
  const listingId = parseInt(event.pathParameters.id);
  const updates = event.body;

  const allowedFields = [
    "name",
    "description",
    "building_type",
    "latest_price_eur",
    "surface_area_m2",
    "rooms_count",
    "bedrooms_count",
    "contact_phone_number",
    "postal_address",
  ];

  if (!updates || Object.keys(updates).length === 0) {
    return {
      statusCode: 400,
      response: { message: "No fields to update. The payload is empty." },
    };
  }

  const invalidFields = Object.keys(updates).filter(
    (field) => !allowedFields.includes(field)
  );

  if (invalidFields.length > 0) {
    return {
      statusCode: 400,
      response: {
        message: `Invalid fields provided: ${invalidFields.join(", ")}`,
      },
    };
  }

  const repository = getRepository(context.postgres);

  try {
    const existingListing = await repository.getListing(listingId);

    const updatedData = { ...existingListing, ...updates };

    if (
      updates.latest_price_eur &&
      updates.latest_price_eur !== existingListing.latest_price_eur
    ) {
      await repository.addPriceHistory(listingId, updates.latest_price_eur);
    }

    const updatedListing = await repository.updateListing(
      listingId,
      updatedData
    );

    return { statusCode: 200, response: updatedListing };
  } catch (e) {
    if (e instanceof EntityNotFound) {
      throw new NotFound(e.message);
    }
    throw e;
  }
});
