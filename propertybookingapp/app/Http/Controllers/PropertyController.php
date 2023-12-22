<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Property;
use App\Http\Resources\PropertyResource;
use App\Models\PropertyType;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;


class PropertyController extends Controller
{
    public function index()
    {
        $kupovine = Property::all();
        return PropertyResource::collection($kupovine);
    }


    public function show($id)
    {
        $kupovina = Property::findOrFail($id);
        return new PropertyResource($kupovina);
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'adresa' => 'required',
            'grad' => 'required',
            'cena' => 'required',
            'kvadratura' => 'required',
            'tipGradnje' => 'required|in:Novogradnja,Starogradnja,U toku gradnje',
            'brojSoba' => 'required',
            'slika' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'property_type_id' => [
                'required', //  u rasponu od 1 do 8
                function ($attribute, $value, $fail) {
                    // Provera postojanja tipa nekretnine sa datim ID-em
                    $exists = PropertyType::where('id', $value)->exists();
                    if (!$exists) {
                        $fail('Selected property type does not exist.');
                    }
                },
            ],
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
             }
        //ime za sliku
        $imageName = Str::random(15).".".$request->slika->getClientOriginalExtension();

        $property = new Property();
        $property->adresa = $request->adresa;
        $property->grad = $request->grad;
        $property->kvadratura = $request->kvadratura;
        $property->tipGradnje = $request->tipGradnje;
        $property->brojSoba = $request->brojSoba;
        $property->slika = $imageName;
        $property->cena = $request->cena;
        $property->property_type_id = $request->property_type_id;
        $property->save();

        //slika koja je okacena cuva se u storage
        Storage::disk('public')->put($imageName, file_get_contents($request->slika));

        return response()->json(['Created new property with image upload.',
            new PropertyResource($property)]);
     }



    //vrati properties koje imaju veci ili jednaki broj soba od unesenog
    public function getPropertiesByNumberOfRooms($brojSoba)
    {
        $properties = Property::where('brojSoba', '>=', $brojSoba)->get();

        return response()->json([
            'message' => 'Properties with more than ' . $brojSoba . ' rooms',
            'properties' => PropertyResource::collection($properties)
        ]);
    }

    //vrati properties po tipu propertija - po nazivu unesenom i paginiraj
    public function getPropertiesByPropertyType(Request $request)
    {
        $nazivTipa = $request->input('nazivTipa');
    
        $propertyType = PropertyType::where('nazivTipa', trim($nazivTipa))->first();
    
        //ako ne postoji taj tip
        if (!$propertyType) {
            return response()->json(['message' => 'Property type not found.'], 404);
        }
    
        //smesta sve koje su tog tipa
        $properties = Property::where('property_type_id', $propertyType->id)->get();
    
        //ako je prazan niz
        if ($properties->isEmpty()) {
            return response()->json(['message' => 'No properties of type ' . $nazivTipa . ' found.'], 404);
        }
    
        //trenutna stranica
        $currentPage = Paginator::resolveCurrentPage();
        $perPage = 1;
        //vraca rezultate za trenutnu stranicu, sece niz properties na osnovu formule
        //pretvara u php array sa fjom all jer to prihvata lenghtAwarePaginator
        $currentPageSearchResults = $properties->slice(($currentPage - 1) * $perPage, $perPage)->all();

        //kreira se obj LenghtAwarePaginator koji rezultate pretrage, ukupan broj properties, koliko po stranici
        $paginatedSearchResults= new \Illuminate\Pagination\LengthAwarePaginator($currentPageSearchResults, count($properties), $perPage);
    
        //properties koje su po paginate principu uradjene
        return response()->json([
            'message' => 'Properties of type ' . $nazivTipa . ' found: ',
            'properties' => PropertyResource::collection($paginatedSearchResults)
        ]);
    }


    //brisanje property-a sa brisanjem i slike
     public function destroy($id)
     {
          // Detail 
          $property = Property::find($id);

          if(!$property){
            return response()->json([
               'message'=>'Property not found.'
  
            ],404);
          }
  
          $storage = Storage::disk('public');
          if($storage->exists($property->slika))
              $storage->delete($property->slika);
  
          // Brisanje Nekretnine
          $property->delete();
  
          // Return Json Response
          return response()->json([
              'message' => "Property deleted successfully."
          ],200);
     }




}
