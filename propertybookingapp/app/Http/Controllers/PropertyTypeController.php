<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PropertyType;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\PropertyTypeResource;

class PropertyTypeController extends Controller
{
    public function index()
    {
        $kupovine = PropertyType::all();
        return PropertyTypeResource::collection($kupovine);
    }
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'nazivTipa' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $propertyType = PropertyType::findOrFail($id);

        $propertyType->nazivTipa = $request->nazivTipa;
        $propertyType->save();

        return response()->json(['Updated property type name.'
        , new PropertyTypeResource($propertyType)]);
    } 
}
