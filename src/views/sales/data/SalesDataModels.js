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
