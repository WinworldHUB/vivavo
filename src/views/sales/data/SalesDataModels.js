export class OrderStatus {
  Delivered;
  Cancelled;
  Returned;

  constructor(delivered, cancelled, returned) {
    this.Delivered = delivered;
    this.Cancelled = cancelled;
    this.Returned = returned;
  }
}

export class SalesOrder {
  OrderNo;
  Items;
  Quantity;
  PV;
  Price;
  DeliveredOn;
  Status;

  constructor(OrderNo, Items, Quantity, PV, Price, DeliveredOn, Status) {
    this.OrderNo = OrderNo;
    this.Items = Items;
    this.Quantity = Quantity;
    this.PV = PV;
    this.Price = Price;
    this.DeliveredOn = DeliveredOn;
    this.Status = Status;
  }
}
