export class SalesOrder {
  OrderNo;
  Items;
  Quantity;
  PV;
  Price;
  DeliveredOn;
  Status;
  OrderType;

  constructor(
    OrderNo,
    Items,
    Quantity,
    PV,
    Price,
    DeliveredOn,
    Status,
    OrderType
  ) {
    this.OrderNo = OrderNo;
    this.Items = Items;
    this.Quantity = Quantity;
    this.PV = PV;
    this.Price = Price;
    this.DeliveredOn = DeliveredOn;
    this.Status = Status;
    this.OrderType = OrderType;
  }
}
