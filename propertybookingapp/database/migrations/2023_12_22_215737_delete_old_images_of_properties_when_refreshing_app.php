<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
       
        $extensions = ['png', 'jpg', 'jpeg', 'gif', 'svg'];

        $path = 'public'; 
        $files = Storage::files($path);
        foreach ($files as $file) {
            $fileExtension = pathinfo($file, PATHINFO_EXTENSION);

            if (in_array($fileExtension, $extensions)) {
                
                Storage::delete($file);
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
