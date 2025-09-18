import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Mock news data since we're not implementing a real news API
const mockNews = [
  {
    id: 1,
    title: "Bitcoin ETF Sees Record Inflows",
    description: "Institutional investors pour $2B into Bitcoin ETFs amid bullish sentiment...",
    timestamp: "2 hours ago"
  },
  {
    id: 2,
    title: "Ethereum 2.0 Staking Milestone",
    description: "ETH staking reaches new heights with over 25% of supply now staked...",
    timestamp: "4 hours ago"
  },
  {
    id: 3,
    title: "DeFi Protocol Launches",
    description: "New decentralized exchange promises zero slippage trades...",
    timestamp: "6 hours ago"
  }
];

export default function MarketNews() {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4" data-testid="text-news-title">Market News</h3>
        <div className="space-y-4">
          {mockNews.map((news, index) => (
            <div 
              key={news.id} 
              className={`${index < mockNews.length - 1 ? 'border-b border-border pb-3' : ''}`}
              data-testid={`news-item-${news.id}`}
            >
              <h4 className="font-medium text-sm mb-1" data-testid={`news-title-${news.id}`}>
                {news.title}
              </h4>
              <p className="text-xs text-muted-foreground mb-2" data-testid={`news-description-${news.id}`}>
                {news.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground" data-testid={`news-timestamp-${news.id}`}>
                  {news.timestamp}
                </span>
                <Button
                  variant="link"
                  size="sm"
                  className="text-xs text-primary p-0 h-auto"
                  data-testid={`button-read-more-${news.id}`}
                >
                  Read more
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <Button
          variant="ghost"
          className="w-full mt-4 text-sm text-primary hover:bg-primary/5"
          data-testid="button-view-all-news"
        >
          View All News
        </Button>
      </CardContent>
    </Card>
  );
}
