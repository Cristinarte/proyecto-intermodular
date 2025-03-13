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
        Schema::table('medical_letters', function (Blueprint $table) {
            //
            $table->string('specialist_name')->after('name_children')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('medical_letters', function (Blueprint $table) {
            //
            $table->dropColumn('specialist_name');
        });
    }
};
