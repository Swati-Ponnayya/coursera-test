(function (){
    'use strict';

angular.module('Data')
.service('MenuDataService', MenuDataService);


MenuDataService.$inject = ['$http']
function MenuDataService  ($http) {
    var service = this;

    service.list = [];
    service.catList = []

    service.clearList = function (){
        service.list.splice(0, service.list.length);
    }

    service.getAllCategories = function (){
        return $http({
            method: 'GET',
            url: 'https://davids-restaurant.herokuapp.com/categories.json'
        }).then(function success(resp){
            service.list = resp.data;
            

        }, function error(resp){

        });
        
    }
    service.getItemsForCategory = function (category){
        return $http({
            method: 'GET',
            url: 'https://davids-restaurant.herokuapp.com/menu_items.json?category=' + category
        }).then(function success(resp){
            service.catList = resp.data.menu_items;
        }, function error(resp){

        });
        
    }

    service.getList = function (){
        return service.list;
    }

    service.getCatList = function (){
        return service.catList;
    }

    
};

})();