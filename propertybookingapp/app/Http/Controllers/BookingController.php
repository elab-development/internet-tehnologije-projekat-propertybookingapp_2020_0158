<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;
use App\Http\Resources\BookingResource;
use Illuminate\Support\Facades\Validator;

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

    public function store(Request $request)
    {
        // Validacija za polja koja se unose preko requesta
        $validator = Validator::make($request->all(), [
            'nacinPlacanja' => 'required|in:Gotovina,Kartica,Cekovi',
            'izvrsenoPlacanje' => 'required|in:DA,NE',
            'brojDana' => 'required|integer|min:1|max:30',
            'property_id' => 'required|exists:properties,id',
            'agent_id' => 'required|exists:agents,id',
        ]);

        // Provera validacije
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // Kreiranje novog bookinga
    
        $booking = new Booking();
        $booking->nacinPlacanja = $request->nacinPlacanja;
        $booking->izvrsenoPlacanje = $request->izvrsenoPlacanje;
        $booking->datumPlacanja = now()->toDateString();
        $booking->brojDana = $request->brojDana;
        $booking->property_id = $request->property_id;
        $booking->agent_id = $request->agent_id;
    
        $booking->save();

        
        return response()->json(['Created new booking.',
         new BookingResource($booking)]);
    }

    public function update(Request $request, $id)
    {
        // Validacija za polja koja se unose preko requesta
        $validator = Validator::make($request->all(), [
            'nacinPlacanja' => 'required|in:Gotovina,Kartica,Cekovi',
            'izvrsenoPlacanje' => 'required|in:DA,NE',
            'brojDana' => 'required|integer|min:1|max:30',
        ]);

        // Provera validacije
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // Ažuriranje bookinga
        $booking = Booking::findOrFail($id);

        $booking->nacinPlacanja = $request->nacinPlacanja;
        $booking->izvrsenoPlacanje = $request->izvrsenoPlacanje;
        $booking->brojDana = $request->brojDana;
        $booking->save();

        return response()->json(['Updated booking.',
            new BookingResource($booking)]);
    }

    public function destroy($id)
    {
        $booking = Booking::findOrFail($id);
        $booking->delete();
        return response()->json('Deleted booking.');
    }




}
