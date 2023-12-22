<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\PropertyController;

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

Route::get('booking', [BookingController::class, 'index']); 

Route::get('booking/{id}', [BookingController::class, 'show']); 

Route::get('property', [PropertyController::class, 'index']); 

Route::get('property/{id}', [PropertyController::class, 'show']); 