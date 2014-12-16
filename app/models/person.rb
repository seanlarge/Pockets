class Person
  include Neo4j::ActiveNode


  property :name
  property :age, type: Integer
  property :title
  property :email
  property :employer
  property :notes



end
