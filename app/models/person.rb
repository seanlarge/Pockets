class Person
  include Neo4j::ActiveNode
  has_many :both, :knows, model_class: Person
  has_one :in, :user
  property :name
  property :age, type: Integer
  property :title
  property :email
  property :employer
  property :notes



end
