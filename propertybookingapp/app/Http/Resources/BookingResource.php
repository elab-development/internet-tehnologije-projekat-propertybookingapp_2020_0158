<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;


class BookingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'ID -> ' => $this->resource->id,
            'Nacin placanja -> ' => $this->resource->nacinPlacanja,
            'Izvrseno placanje -> ' => $this->resource->izvrsenoPlacanje,
            'Datum placanja -> ' => $this->resource->datumPlacanja,
            'Broj dana na koliko se rezervise -> ' => $this->resource->brojDana,
            'Koja nekretnina -> ' => new PropertyResource($this->resource->property),
            'Koji agent je izdao nekretninu -> ' => new AgentResource($this->resource->agent),
        ];
    }
}
