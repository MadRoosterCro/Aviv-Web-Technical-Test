# AVIV technical test solution BackEnd

## Notes

- noticed PUT was defined but PATCH was not which is more by-the-book method for partial updates, can get messy with sending the full body on each update
- created the PATCH endpoint with aditional validation for empty payload and invalid fields
- every change to the latest_price_eur field should create an entry in the price history table
- I wanted to serve openapi locally with swagger so I adjusted the `listingapi.yaml`, added a PATCH endpoint there and marked PUT as deprecated
- used existing repository methods to handle database interactions for consisten

## Questions

This section contains additional questions your expected to answer before the debrief interview.

- **What is missing with your implementation to go to production?**
- Testing - unit and integration tests
- Security - auth to restrict access
- Documentation - openAPI should show some examples and error codes for all endpoints
- New architecture diagram with Redis for caching and a load balancer for high traffic

- **How would you deploy your implementation?**

- AWS for services like Lambda, ssm params store for storing env secrets
- GitHub actions for running automation tests (if and when they will exist), build and deployment
- Leverage CloudWatch for logging and monitoring

- **If you had to implement the same application from scratch, what would you do differently?**

- consider the performance impact of queries on a large dataset early in the design phase
- probably I would use some lib like Zod for validation to avoid 'doing it by hand'
- introduce auth from start
- it would also be good to define test cases before actual implementation

- **The application aims at storing hundreds of thousands listings and millions of prices, and be accessed by millions
  of users every month. What should be anticipated and done to handle it?**

  - high traffic is anticipated, so we should introduce some caching like Redis for frequently accessed data
  - its expected that endpoints get pinged a lot so some rate limiting should be implemented to avoid huge traffic spikes
  -

  NB: You must update the [given architecture schema](./schemas/Aviv_Technical_Test_Architecture.drawio) by importing it
  on [diagrams.net](https://app.diagrams.net/)


