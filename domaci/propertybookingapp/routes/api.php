<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\AgentController;
use App\Http\Controllers\PropertyTypeController;
use \App\Http\Controllers\AuthController;

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

Route::get('propertytypes', [PropertyTypeController::class, 'index']); 

Route::get('properties', [PropertyController::class, 'index']); 

Route::get('agents', [AgentController::class, 'index']); 

Route::post('/register',[AuthController::class,'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('forgotPassword',[AuthController::class,'forgotPassword']);

Route::group(['middleware' => ['auth:sanctum']], function () {
     Route::post('/logout', [AuthController::class, 'logout']);  

     Route::post('/properties', [PropertyController::class, 'store']);

     Route::delete('/properties/{id}', [PropertyController::class, 'destroy']);

     Route::patch('/agents/{id}', [AgentController::class, 'updateAddress']);

     Route::put('/propertytypes/{id}', [PropertyTypeController::class, 'update']);

});






