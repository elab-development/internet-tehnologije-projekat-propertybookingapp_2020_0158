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
            'id' => $this->resource->id,
            'nacinPlacanja' => $this->resource->nacinPlacanja,
            'izvrsenoPlacanje' => $this->resource->izvrsenoPlacanje,
            'datumPlacanja' => $this->resource->datumPlacanja,
            'brojDana' => $this->resource->brojDana,
            'property' => new PropertyResource($this->resource->property),
            'agent' => new AgentResource($this->resource->agent),
        ];
    }
}
