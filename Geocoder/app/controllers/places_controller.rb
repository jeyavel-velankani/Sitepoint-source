class PlacesController < ApplicationController
  def index
    @places = Place.order('created_at DESC')
  end

  def edit_index
    @places = Place.order('created_at DESC')
  end

  def show
    @place = Place.find(params[:id])
  end

  def new
    @place = Place.new
  end

  def edit
    @place = Place.find(params[:id])
    puts @place.inspect
  end

  def update
    @place = Place.find(params[:id])
    respond_to do |format|
      if @place.update(place_params)
        format.html { redirect_to @place, notice: 'Place was successfully updated.' }
      else
        format.html { render :edit_index }
      end
    end

  end

  def create
    @place = Place.new(place_params)
    if @place.save
      flash[:success] = "Place added!"
      redirect_to root_path
    else
      render 'new'
    end
  end

  private

  def place_params
    params.require(:place).permit(:title, :raw_address, :latitude, :longitude, :visited_by)
  end
end