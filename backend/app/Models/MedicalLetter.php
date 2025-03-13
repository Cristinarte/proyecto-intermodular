<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MedicalLetter extends Model
{
    use HasFactory;

    // Indica la tabla que el modelo está utilizando
    protected $table = 'medical_letters';

    // Los campos que se pueden asignar masivamente (mass assignment)
    protected $fillable = [
        'user_id',         // Relacion con el usuario
        'name_children',   // Nombre del niño
        'file_path',       // Ruta de la imagen
        'visit_place',     // Lugar de la visita
        'visit_date',      // Fecha de la visita
        'specialist_name',  //Nombre del especialista    
    ];

    // Relación con el modelo de usuario (si tienes un modelo User)
    public function user()
    {
        return $this->belongsTo(User::class); // Relación inversa (un MedicalLetter pertenece a un User)
    }
}
