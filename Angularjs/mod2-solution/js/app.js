(function () {
'use strict';

angular.module('ShoppingListCheckOff',[])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {

  var list = this;

  list.items = ShoppingListCheckOffService.getshoppinglist();

  list.removeItem = function (itemIndex) {
    ShoppingListCheckOffService.removeItem(itemIndex);
  };
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var list2 = this;
  list2.items = ShoppingListCheckOffService.getshoppinglist2();
}


function ShoppingListCheckOffService() {
  var service = this;
  var shoppinglist = [
    {
      name: "Milk",
      quantity: "2"
    },
    {
      name: "Donuts",
      quantity: "20"
    },
    {
      name: "Cookies",
      quantity: "30"
    },
    {
      name: "Chocolate",
      quantity: "5"
    },
    {
      name: "Chips",
      quantity: "4"
    }
  ];

var shoppinglist2=[];

  service.removeItem = function (itemIndex) {
    var element = shoppinglist[itemIndex];
    shoppinglist.splice(itemIndex, 1);
    shoppinglist2.push(element);
  };

  service.getshoppinglist = function () {
    return shoppinglist;
  };
  service.getshoppinglist2 = function () {
    return shoppinglist2;
  };
}

})();
