class Person
  include Neo4j::ActiveNode
  #
  # Neo4j.rb needs to have property definitions before any validations. So, the property block needs to come before
  # loading your devise modules.
  #
  # If you add another devise module (such as :lockable, :confirmable, or :token_authenticatable), be sure to
  # uncomment the property definitions for those modules. Otherwise, the unused property definitions can be deleted.
  #

   property :username, :type =>   String
   property :facebook_token, :type => String
   index :facebook_token

   property :created_at, :type => DateTime
   property :updated_at, :type => DateTime

   ## Database authenticatable
   property :email, :type => String, :null => false, :default => ""
   index :email

   property :encrypted_password

   ## If you include devise modules, uncomment the properties below.

   ## Rememberable
   property :remember_created_at, :type => DateTime
   index :remember_token


   ## Recoverable
   property :reset_password_token
   index :reset_password_token
   property :reset_password_sent_at, :type =>   DateTime

   ## Trackable
   property :sign_in_count, :type => Integer, :default => 0
   property :current_sign_in_at, :type => DateTime
   property :last_sign_in_at, :type => DateTime
   property :current_sign_in_ip, :type =>  String
   property :last_sign_in_ip, :type => String


    ## Token authenticatable
    # property :authentication_token, :type => String, :null => true, :index => :exact


  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  property :name
  property :age, type: Integer
  property :email
  property :employer
  property :notes

end
