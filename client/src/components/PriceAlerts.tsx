import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, X } from "lucide-react";
import { usePriceAlerts } from "@/hooks/useCryptoData";
import { useToast } from "@/hooks/use-toast";

export default function PriceAlerts() {
  const { data: alerts, isLoading } = usePriceAlerts();
  const { toast } = useToast();

  const handleDeleteAlert = (alertId: string) => {
    toast({
      title: "Alert deleted",
      description: "Price alert has been removed successfully"
    });
  };

  const getAlertVariant = (isTriggered: boolean) => {
    if (isTriggered) return "destructive";
    return "secondary";
  };

  const getAlertStatus = (isTriggered: boolean) => {
    return isTriggered ? "Triggered" : "Active";
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Price Alerts</h3>
            <Plus className="h-4 w-4 text-primary" />
          </div>
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-3 border rounded">
                <div className="flex items-center justify-between">
                  <div>
                    <Skeleton className="w-20 h-4 mb-1" />
                    <Skeleton className="w-24 h-3" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Skeleton className="w-16 h-5" />
                    <Skeleton className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold" data-testid="text-alerts-title">Price Alerts</h3>
          <Button variant="ghost" size="icon" data-testid="button-add-alert">
            <Plus className="h-4 w-4 text-primary" />
          </Button>
        </div>
        
        <div className="space-y-3">
          {(!alerts || alerts.length === 0) ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No price alerts set</p>
              <p className="text-sm">Create alerts to get notified of price changes</p>
            </div>
          ) : (
            alerts.map((alert) => {
              const alertType = alert.alertType;
              const targetValue = parseFloat(alert.targetValue);
              
              let alertDescription = '';
              switch (alertType) {
                case 'price_above':
                  alertDescription = `Price above $${targetValue.toLocaleString()}`;
                  break;
                case 'price_below':
                  alertDescription = `Price below $${targetValue.toLocaleString()}`;
                  break;
                case 'percentage_change':
                  alertDescription = `24h change > ${targetValue}%`;
                  break;
                default:
                  alertDescription = `Alert at ${targetValue}`;
              }

              return (
                <div 
                  key={alert.id}
                  className={`p-3 rounded border ${
                    alert.isTriggered 
                      ? 'bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800' 
                      : alert.isTriggered === false 
                        ? 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800'
                        : 'bg-secondary border-border'
                  }`}
                  data-testid={`alert-item-${alert.id}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm" data-testid={`alert-title-${alert.id}`}>
                        {alert.crypto.symbol.toUpperCase()} Alert
                      </div>
                      <div className="text-xs text-muted-foreground" data-testid={`alert-description-${alert.id}`}>
                        {alertDescription}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={getAlertVariant(alert.isTriggered || false)}
                        data-testid={`alert-status-${alert.id}`}
                      >
                        {getAlertStatus(alert.isTriggered || false)}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-4 h-4 text-muted-foreground hover:text-destructive"
                        onClick={() => handleDeleteAlert(alert.id)}
                        data-testid={`button-delete-alert-${alert.id}`}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        
        <Button
          variant="outline"
          className="w-full mt-4 border-dashed text-muted-foreground"
          data-testid="button-create-alert"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Alert
        </Button>
      </CardContent>
    </Card>
  );
}
