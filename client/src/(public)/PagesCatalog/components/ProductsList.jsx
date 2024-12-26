import { Building } from 'lucide-react'

export function ProductsList() {
  const properties = [
    {
      id: 1,
      name: "SkyAgora Building",
      price: "$1,750",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 2,
      name: "Uniqo Maximally",
      price: "$2,500",
      image: "/placeholder.svg?height=200&width=200",
      selected: true,
    },
    {
      id: 3,
      name: "Residential Complex",
      price: "$1,450",
      image: "/placeholder.svg?height=200&width=200",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium">22 Results</h2>
        <Building className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="space-y-4">
        {properties.map((property) => (
          <div
            key={property.id}
            className={`relative overflow-hidden rounded-xl ${
              property.selected ? "ring-2 ring-primary" : ""
            }`}
          >
            <Image
              src={property.image}
              alt={property.name}
              width={320}
              height={200}
              className="h-[140px] w-full object-cover"
            />
            <div className="p-3">
              <h3 className="font-medium">{property.name}</h3>
              <p className="text-sm text-muted-foreground">{property.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

