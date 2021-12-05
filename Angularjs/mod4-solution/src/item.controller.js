(function () {
    'use strict';
    
    angular.module('MenuApp')
    .controller('ItemsController', ItemsController);
    
    ItemsController.$inject = ['MenuDataService', 'itemsCat'];
    function ItemsController(MenuDataService, itemsCat) {
      var items = this;
      items.item = MenuDataService.getCatList();
      
    }
    
    })();