<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;
use App\Http\Resources\BookingResource;

class BookingController extends Controller
{
    public function index()
    {
        $kupovine = Booking::all();
        return BookingResource::collection($kupovine);
    }


    public function show($id)
    {
        $kupovina = Booking::findOrFail($id);
        return new BookingResource($kupovina);
    }
}
