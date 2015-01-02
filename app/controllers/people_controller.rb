class PeopleController < ApplicationController
  before_action :set_person, only: [:show, :edit, :update, :destroy]


  def index
    @people = current_person.knows
  end

  def show
    @connection = Person.new
  end

  def new
    @person = Person.new

  end

  def create
    @person = Person.find(params[:person_id])
    @connection = Person.new(person_params)
    @person.knows << @connection

    # if @connection.name || @person.name
    #   @person.find(params[:person_id]).knows << @connection(person_params)

    respond_to do |format|
      if @person.save
        format.html { redirect_to @person, notice: 'Person was successfully created' }
        format.json { render action: 'show', status: :created, location: @person}
      else
        format.html { render action: 'new' }
        format.json { render json: @person.errors, status: :unprocessable_entity }
      end
    end
  end


  def update
    respond_to do |format|
      if @person.update(person_params)
        format.html { redirect_to @person, notice: 'person was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @person.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @person.destroy
    respond_to do |format|
      format.html { redirect_to people_url }
      format.json { head :no_content }
    end
  end

  private

  def set_person
    @person = Person.find(params[:id])
  end

  def person_params
    params.require(:person).permit(:name, :age, :email, :employer, :notes)
  end



end



