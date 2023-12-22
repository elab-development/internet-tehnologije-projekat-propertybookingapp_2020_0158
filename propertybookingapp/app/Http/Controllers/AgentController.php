<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\AgentResource;
use Illuminate\Support\Facades\Validator;
use App\Models\Agent;

class AgentController extends Controller
{
    //azuriranje samo adrese agenta
    public function updateAddress(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'adresa' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $agent =Agent::findOrFail($id);

        $agent->adresa = $request->adresa;
        $agent->save();

        return response()->json(['Updated agent address!', new AgentResource($agent)]);
    }
}
