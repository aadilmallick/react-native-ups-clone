import { gql } from "@apollo/client";

export const GET_ORDERS = gql`
  query GetOrders {
    getOrders {
      Address
      City
      Lat
      Lng
      carrier
      createdAt
      shippingCost
      trackingId
    }
  }
`;

export const GET_CUSTOMERS = gql`
  query GetCustomers {
    getCustomers {
      email
      name
    }
  }
`;
