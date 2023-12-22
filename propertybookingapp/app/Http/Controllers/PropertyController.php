<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Property;
use App\Http\Resources\PropertyResource;
use App\Models\PropertyType;
use Illuminate\Pagination\Paginator;

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




}
