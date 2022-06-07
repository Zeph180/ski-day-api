const { ApolloServer, gql} = require("apollo-server")

const typeDefs = gql`
    scalar Date

    """
    An objec that describes the xtics of a skiday
    """
    type SkiDay {
        "A ski days identifier"
        id: ID!
        date: Date!
        mountains: String!
        conditions: Conditions
    }

    enum Conditions {
        HEAVY
        POWDER
        THIN
        ICE
    }

    type Query {
        totalDays: Int!
        allDays: [SkiDay!]!
    }

    input AddDayInput {
        day:  Date!
        mountain: String!
        id: ID!
    }

    type RemoveDayPayload {
        day: SkiDay!
        removed: Boolean
        totalBefore: Int
        totalAfter: Int
    }

    type Mutation {
        addDay(input: AddDayInput): SkiDay
        removeDay(id: ID!): RemoveDayPayload!
    }

    type Subscription{
        newDay: SkiDay!
    }
`;

// defined Later
// const resolvers = {

// }

const mocks = {
   Date: () => "9/12/2000"
}

const server = new ApolloServer({
    typeDefs,
    mocks
})

server.listen().then(({url}) => console.log(`server running at port ${url}`))