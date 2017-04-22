<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Tacka;

class PretragaTacakaController extends Controller
{
    public function pretragaTacaka(Request $request){
    		$lat = $request->lat;
    		$lng = $request->lng;

    		$tacke = Tacka::whereBetween('sirina', [$lat-0.1, $lat+0.1])->whereBetween('duzina', [$lng-0.1, $lng+0.1])->get();

    		return $tacke;
    }
}
