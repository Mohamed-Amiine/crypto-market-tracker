import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Cryptocurrency } from "@shared/schema";

interface MarketOverviewProps {
  cryptocurrencies: Cryptocurrency[];
}

const cryptoIcons = {
  bitcoin: "🟠",
  ethereum: "🔵", 
  "binance-coin": "🟡",
  solana: "🟣"
};

const cryptoColors = {
  bitcoin: "bg-orange-500",
  ethereum: "bg-blue-600",
  "binance-coin": "bg-yellow-500",
  solana: "bg-purple-600"
};

export default function MarketOverview({ cryptocurrencies }: MarketOverviewProps) {
  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold" data-testid="text-market-overview-title">Market Overview</h2>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span>Live Updates</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {cryptocurrencies.map((crypto) => {
          const priceChange = parseFloat(crypto.price_change_percentage_24h || "0");
          const isPositive = priceChange >= 0;
          const price = parseFloat(crypto.current_price || "0");
          const volume = parseFloat(crypto.total_volume || "0");

          return (
            <Card key={crypto.id} className="hover:shadow-md transition-shadow ripple-effect" data-testid={`card-crypto-${crypto.id}`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 ${cryptoColors[crypto.id as keyof typeof cryptoColors] || 'bg-gray-500'} rounded-full flex items-center justify-center text-white font-bold`}>
                      {crypto.image ? (
                        <img src={crypto.image} alt={crypto.name} className="w-6 h-6" />
                      ) : (
                        crypto.symbol.substring(0, 3).toUpperCase()
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold" data-testid={`text-crypto-name-${crypto.id}`}>{crypto.name}</h3>
                      <span className="text-sm text-muted-foreground" data-testid={`text-crypto-symbol-${crypto.id}`}>
                        {crypto.symbol.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" data-testid={`button-star-${crypto.id}`}>
                    <Star className="h-4 w-4 text-muted-foreground hover:text-yellow-500" />
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <div className="text-2xl font-bold" data-testid={`text-crypto-price-${crypto.id}`}>
                    ${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span 
                      className={`text-sm font-medium ${isPositive ? 'profit' : 'loss'}`}
                      data-testid={`text-crypto-change-${crypto.id}`}
                    >
                      {isPositive ? '+' : ''}{priceChange.toFixed(2)}%
                    </span>
                    <span className="text-sm text-muted-foreground">24h</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Vol: <span data-testid={`text-crypto-volume-${crypto.id}`}>
                      ${volume > 1e9 ? (volume / 1e9).toFixed(1) + 'B' : (volume / 1e6).toFixed(1) + 'M'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
