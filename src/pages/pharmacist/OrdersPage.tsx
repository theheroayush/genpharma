import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useOrders } from "@/contexts/OrderContext";
import { Eye, Package, Truck, CheckCircle2, Clock, ChevronRight } from "lucide-react";
import type { Order, OrderStatus } from "@/types";

const statusConfig: Record<OrderStatus, { label: string; variant: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "info" | "muted"; icon: typeof Clock }> = {
  processing: { label: "Processing", variant: "warning", icon: Clock },
  assembled: { label: "Assembled", variant: "info", icon: Package },
  shipped: { label: "Shipped", variant: "secondary", icon: Truck },
  delivered: { label: "Delivered", variant: "success", icon: CheckCircle2 },
};

const statusOrder: OrderStatus[] = ["processing", "assembled", "shipped", "delivered"];

export default function OrdersPage() {
  const { toast } = useToast();
  const { orders, setOrders } = useOrders();
  const [tab, setTab] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filtered = useMemo(() => {
    if (tab === "all") return orders;
    return orders.filter((o) => o.status === tab);
  }, [orders, tab]);

  const advanceStatus = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        const currentIdx = statusOrder.indexOf(o.status);
        if (currentIdx >= statusOrder.length - 1) return o;
        const nextStatus = statusOrder[currentIdx + 1];
        return {
          ...o, status: nextStatus,
          timeline: [...o.timeline, { status: nextStatus, timestamp: new Date().toISOString() }],
        };
      })
    );
    toast({ title: "Order updated", description: `Order status advanced.` });
    // Update selected order if open
    setSelectedOrder((prev) => {
      if (!prev || prev.id !== orderId) return prev;
      const currentIdx = statusOrder.indexOf(prev.status);
      const nextStatus = statusOrder[currentIdx + 1];
      return nextStatus ? { ...prev, status: nextStatus, timeline: [...prev.timeline, { status: nextStatus, timestamp: new Date().toISOString() }] } : prev;
    });
  };

  const counts = useMemo(() => ({
    all: orders.length,
    processing: orders.filter((o) => o.status === "processing").length,
    assembled: orders.filter((o) => o.status === "assembled").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
  }), [orders]);

  return (
    <>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Orders</h1>
          <p className="text-muted-foreground text-sm">{orders.length} total orders</p>
        </div>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="all">All ({counts.all})</TabsTrigger>
            <TabsTrigger value="processing">Processing ({counts.processing})</TabsTrigger>
            <TabsTrigger value="assembled">Assembled ({counts.assembled})</TabsTrigger>
            <TabsTrigger value="shipped">Shipped ({counts.shipped})</TabsTrigger>
            <TabsTrigger value="delivered">Delivered ({counts.delivered})</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* ─── Order Cards ─── */}
        <div className="space-y-3">
          {filtered.map((order) => {
            const cfg = statusConfig[order.status];
            const StatusIcon = cfg.icon;
            const canAdvance = statusOrder.indexOf(order.status) < statusOrder.length - 1;
            return (
              <Card key={order.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary text-sm">{order.patientInitials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{order.patientName}</p>
                        <p className="text-xs text-muted-foreground">{order.id} · {order.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={cfg.variant} className="gap-1">
                        <StatusIcon className="h-3 w-3" /> {cfg.label}
                      </Badge>
                      <span className="font-semibold text-sm">{order.total}</span>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {order.items.map((item, i) => (
                      <Badge key={i} variant="outline" className="text-xs">{item.name} × {item.quantity}</Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="mt-3 flex gap-2 justify-end">
                    <Button variant="outline" size="sm" className="gap-1" onClick={() => setSelectedOrder(order)}>
                      <Eye className="h-3 w-3" /> View Details
                    </Button>
                    {canAdvance && (
                      <Button size="sm" className="gap-1" onClick={() => advanceStatus(order.id)}>
                        <ChevronRight className="h-3 w-3" />
                        {order.status === "processing" ? "Mark Assembled" :
                          order.status === "assembled" ? "Mark Shipped" : "Mark Delivered"}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">No orders in this category.</div>
          )}
        </div>
      </div>

      {/* ─── Order Detail Dialog ─── */}
      <Dialog open={!!selectedOrder} onOpenChange={(v) => !v && setSelectedOrder(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Order {selectedOrder?.id}</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary/10 text-primary">{selectedOrder.patientInitials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-lg">{selectedOrder.patientName}</p>
                  <p className="text-sm text-muted-foreground">{selectedOrder.date} · {selectedOrder.total}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2">Medications</h4>
                <div className="space-y-1">
                  {selectedOrder.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm p-2 bg-muted/50 rounded">
                      <span>💊 {item.name} ({item.dosage})</span>
                      <span className="text-muted-foreground">× {item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h4 className="font-semibold text-sm mb-2">Timeline</h4>
                <div className="space-y-3 relative">
                  <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-border" />
                  {selectedOrder.timeline.map((event, i) => {
                    const cfg = statusConfig[event.status];
                    const Icon = cfg.icon;
                    return (
                      <div key={i} className="flex items-start gap-3 relative">
                        <div className={`z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${i === selectedOrder.timeline.length - 1 ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{cfg.label}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(event.timestamp).toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
