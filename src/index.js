const { ApolloServer, gql } = require("apollo-server");
//немного данных для визуализации
var _phones = [
  { number: "5555", name: "John" },
  { number: "6666", name: "Bill" },
  { number: "7777", name: "Smith" },
  { number: "1234", name: "Sara" }
];
//описание типов для graphql
const typeDefs = gql`
  type Query {
    """
    Получить список телеофнов
    """
    Phones: [Phone]
   
  }
  type Phone {
    """
    Номер телефона
    """
    number: String
    """
    Имя владельца
    """
    name: String
  }
`;
//resolvers for graphql
const resolvers = {

  Query: {
    Phones: () => {
      return _phones; // возвращает весь массив
    }
  }
};
//создаем новый Apollo сервер
const server = new ApolloServer({
  typeDefs,
  resolvers
});
//запускаем
server.listen().then(({ url }) => {
  console.log(`🚀   Apollo взлетел ${url}`);
});
