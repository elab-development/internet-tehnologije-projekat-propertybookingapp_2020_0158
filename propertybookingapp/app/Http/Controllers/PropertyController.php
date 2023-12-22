<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Property;
use App\Http\Resources\PropertyResource;

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
}
