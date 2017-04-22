<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tacka extends Model
{
    protected $table = 'tacke';
    protected $fillable = ['name', 'sirina', 'duzina'];
}
