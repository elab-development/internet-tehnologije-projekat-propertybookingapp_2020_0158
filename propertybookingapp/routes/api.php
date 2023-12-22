<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\AgentController;
use App\Http\Controllers\PropertyTypeController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::resource('bookings', BookingController::class);

//vraca sve properties koje su datog tipa
Route::get('properties/type', [PropertyController::class, 'getPropertiesByPropertyType']); 

//vraca sve properties koje imaju preko tog broja soba - filtriranje
Route::get('/properties/brojsoba/{brojSoba}', [PropertyController::class, 
     'getPropertiesByNumberOfRooms']);

//kreira nov property


Route::patch('/agents/{id}', [AgentController::class, 'updateAddress']);

Route::put('/propertytypes/{id}', [PropertyTypeController::class, 'update']);

Route::get('propertytypes', [PropertyTypeController::class, 'index']); 

Route::post('/properties', [PropertyController::class, 'store']);

Route::delete('/properties/{id}', [PropertyController::class, 'destroy']);


