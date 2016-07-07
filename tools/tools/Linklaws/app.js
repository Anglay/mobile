function isWap() {
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break
        }
    }
    return flag
}
$(function(){
    if (common.isWap()) {
        window.location.href="http://www.linklaws.com";
    }
})

angular.module('LinkLaws.services', []).factory('toasterService', function (toaster) {
    return {
        popMessage: function (message) {
            toaster.error('', message);
        }
    };
})

var helpApp = angular.module('LinkLaws', ['ngTouch','ui.router','ngSanitize','ngAnimate','cgBusy','ngMessages','mgcrea.ngStrap','angular-carousel','toaster','LinkLaws.services']);

helpApp.value('cgBusyDefaults',{
    backdrop: true,
    templateUrl:"loading.html"
});

//程序配置
helpApp.constant('appConfig', {
//    serverAddress: "http://120.25.161.252/tools/"
        serverAddress: "http://co.linklaws.com/tools/"
//      serverAddress: "http://192.168.1.185:8080/linklawsCol/tools/"
});


helpApp.directive('myDatepicker', function ($parse) {
    return {
        restrict: "A",
        replace: false,
        scope:{
            ngModel:'='
        },
        link:function(scope, element, attrs){
            element.mobiscroll().date({
                theme: "android-holo-light",
                mode: "scroller",
                display: "modal",
                lang: "zh"
            });
        },
        template:''
    };
});


helpApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/menu");
    $stateProvider
        .state('menu', {
            url: "/menu",
            templateUrl: "tool-menu.html",
            controller:"mainController"

        })
        .state('arbitrationFee', {
            url: "/arbitrationFee",
            templateUrl: "tool-arbitrationFee.html",
            controller:"arbitrationFeeController"
        })
        .state('economicCompensation', {
            url: "/economicCompensation",
            templateUrl: "tool-economicCompensation.html",
            controller:"economicCompensationController"
        })
        .state('interestRate', {
            url: "/interestRate",
            templateUrl: "tool-interestRate.html",
            controller:"interestRateController"
        })
        .state('lawyerFee', {
            url: "/lawyerFee",
            templateUrl: "tool-lawyerFee.html",
            controller:"lawyerFeeController"
        })
        .state('legalFee', {
            url: "/legalFee",
            templateUrl: "tool-legalFee.html",
            controller:"legalFeeController"
        })
        .state('trafficAccident', {
            url: "/trafficAccident",
            templateUrl: "tool-trafficAccident.html",
            controller:"trafficAccidentController"
        })

});

//主界面
helpApp.controller('mainController', ['$scope',function($scope) {
    $scope.datas = [
        { title: '律师费', desc: '律师费', iconImage:'tool-item-lawyerFee', redirectTo:"lawyerFee" },
        { title: '诉讼费', desc: '诉讼费', iconImage:'tool-item-legalFee', redirectTo:"legalFee" },
        { title: '仲裁费', desc: '仲裁费', iconImage:'tool-item-arbitrationFee', redirectTo:"arbitrationFee" },
        { title: '经济补偿金', desc: '经济补偿金', iconImage:'tool-item-economicCompensation', redirectTo:"economicCompensation" },
        { title: '交通事故赔偿', desc: '交通事故赔偿', iconImage:'tool-item-trafficAccident', redirectTo:"trafficAccident" },
        { title: '利息计算', desc: '利息计算', iconImage:'tool-item-interestRate', redirectTo:"interestRate" }
    ];
    $scope.slides = [{id:1,image:"images/slide1.png"},{id:2,image:"images/slide2.png"}];
}]);

//律师费
helpApp.controller('lawyerFeeController',['$scope','$http','appConfig','$window','$modal','toasterService',function($scope,$http,appConfig,$window,$modal,toasterService){

    $scope.promise = null;
    $scope.showSpecPrice = false;

    $scope.promise = $http.get(appConfig.serverAddress + 'toolcslawyers!getPveJson.action').success(function(data) {
        $scope.areas = data;
    }).error(function(){
        });

    $scope.isDisabled = true;

    var clearData = function(){
        $scope.showResult = false;
        $scope.showFormula = false;
        $scope.showContent = false;
        $scope.showSpecPrice = false;

        $scope.resultData = "";
        $scope.formulaData = "";
        $scope.contentData = "";

        $scope.specPrice = "";
        $scope.timeValue = ""
        $scope.priceValue = "";
    };

    $scope.judgeDisabled = function(){
        var i = angular.isObject($scope.areaValue);
        var j = ($scope.typeValue == "2" && $scope.priceValue !="");
        var k = ($scope.typeValue == "3" && $scope.priceValue !="" && $scope.timeValue != "");
        var l = ($scope.typeValue == "1");

        return !(i && (j || k || l));
    };

    clearData();
    var formValidate = function () {
        if($scope.toolForm.$invalid){
            if($scope.toolForm.areaValue.$invalid){
                toasterService.popMessage("请选择所在地区");
            }
            if($scope.toolForm.priceValue.$invalid){
                if($scope.toolForm.priceValue.$error.required){
                    toasterService.popMessage($scope.typeValue == '2' ? '请输入标的额(元)':'请输入个人收费价格(元/小时)');
                }
                if($scope.toolForm.priceValue.$error.min){
                    toasterService.popMessage("请输入大于0的数值");
                }
                if($scope.toolForm.priceValue.$error.number){
                    //todo
                    toasterService.popMessage("请输入大于0的正整数");
                }
            }
            if($scope.toolForm.timeValue.$invalid){
                toasterService.popMessage("请填写时间(小时)");
            }
            return false;
        }else{
            return true;
        }
    }
    $scope.calc = function(){

        if(formValidate() == false)
            return;

        if(angular.isObject($scope.areaValue)){
            var id = $scope.areaValue.id;

            var sAddress =  appConfig.serverAddress + 'toolcslawyers!getResult.action?';
            if($scope.typeValue == "1"){
                sAddress += "did=" +id +"&type=" + $scope.typeValue;
            }else if($scope.typeValue == "2"){
                sAddress += "did=" +id +"&type=" + $scope.typeValue + "&amount="+ $scope.priceValue;
            }else if($scope.typeValue == "3"){
                sAddress += "did=" +id +"&type=" + $scope.typeValue + "&amount="+ $scope.priceValue + "&hours="+$scope.timeValue;
            }else{
                return;
            }
            $scope.address = sAddress;
            $scope.promise = $http.get(sAddress).success(function(data) {
                $scope.showResult = true;
                $scope.showContent = data.content !="" ? true:false;
                $scope.showFormula = true;

                if($scope.typeValue == "1"){
                    $scope.showFormula = false;
                }else if($scope.typeValue == "2"){
                }else if($scope.typeValue == "3"){
                    $scope.showFormula = false;
                }else{
                    return;
                }
                $scope.showFormula = data.formula !="" ? true:false;

                $scope.resultData = data.result;
                $scope.formulaData = data.formula;
                $scope.contentData = data.contentName;
                $scope.content = data.content;
            });
        }
    };

    $scope.open = function () {
    	$modal({title: $scope.contentData,template: 'modalTemplate.html',show: true,content: $scope.content,"html":true,});
        // $modal({title: $scope.contentData , content: $scope.content,"html":true, show: true});
    };

    $scope.showMessage = function (message) {
        toasterService.popMessage(message);
    }
    $scope.reset = function(){
        //formValidate();
        $scope.typeValue = "1";
        $scope.areaValue = "";
        clearData();
    };


    $scope.areaValueChanged = function(){
        clearData();
        if(angular.isObject($scope.areaValue)){
            $scope.promise = $http.get(appConfig.serverAddress + 'toolcslawyers!getDCLGJson.action?did=' + $scope.areaValue.id).success(function(data) {
                $scope.showSpecPrice = data.formuladesc == "0" ? false:true;
                $scope.specPrice = data.formuladesc;

            });
        }else{
            $scope.showSpecPrice = false;
        }
    };


    $scope.typeValueChanged = function(){
        clearData();
        if(angular.isObject($scope.areaValue)){
            $scope.promise = $http.get(appConfig.serverAddress + 'toolcslawyers!getDCLGJson.action?did=' + $scope.areaValue.id).success(function(data) {
                $scope.showSpecPrice = data.formuladesc == "0" ? false:true;
                $scope.specPrice = data.formuladesc;

            });
        }else{
            $scope.showSpecPrice = false;
        }
    };
}]);

//诉讼费 最多显示3级
helpApp.controller('legalFeeController',['$scope','$http','appConfig','$modal','toasterService',function($scope,$http,appConfig,$modal,toasterService){
    $scope.promise = null;
    $scope.promise = $http.get(appConfig.serverAddress + 'toolcosts!getCostsJson.action?parentid=0').success(function(data) {
        $scope.rootFeeTypes = data;
    });

    $scope.childFeeTypes = [];
    $scope.grandchildFeeTypes = [];
    $scope.needHideGrandchildFeeTypeValue = true;
    $scope.needHidePriceValue = true;
    $scope.priceValue = "";

    var clearData = function(){
        $scope.showResult = false;
        $scope.showFormula = false;
        $scope.showContent = false;

        $scope.resultData = "";
        $scope.formulaData = "";
        $scope.contentData = "";

        $scope.priceValue = "";
    };

    $scope.feeTypeValueChanged = function(){
        $scope.childFeeTypes = [];
        $scope.grandchildFeeTypes = [];
        clearData();

        if(angular.isObject($scope.feeTypeValue)){
            var url = appConfig.serverAddress + "toolcosts!getCostsJson.action?parentid="+$scope.feeTypeValue.dcode;
            $http.get(url).success(function(data) {
                $scope.childFeeTypes = data.rows;
            });
        }
        $scope.needHideGrandchildFeeTypeValue = true;
//        if(angular.isObject($scope.childFeeTypeValue)){
//            $scope.needHidePriceValue = ($scope.childFeeTypeValue.dremark == "1" ? false :true );
//        }else{
//            $scope.needHidePriceValue = true;
//        }
        $scope.needHidePriceValue = true;
        $scope.priceValue = ""
    };
    $scope.childFeeTypeValueChanged = function(){
        $scope.grandchildFeeTypes = [];
        clearData();
        if(angular.isObject($scope.feeTypeValue) && angular.isObject($scope.childFeeTypeValue)){
            var url = appConfig.serverAddress + "toolcosts!getCostsJson.action?parentid="+$scope.childFeeTypeValue.dcode;
            $scope.promise = $http.get(url).success(function(data) {
                $scope.grandchildFeeTypes = data.rows;
                if($scope.grandchildFeeTypes.length > 1){
                    $scope.needHideGrandchildFeeTypeValue = false;
                }else{
                    $scope.needHideGrandchildFeeTypeValue = true;
                }
                $scope.priceValue = ""
                if(angular.isObject( $scope.childFeeTypeValue)){
                    $scope.needHidePriceValue = ($scope.childFeeTypeValue.dremark == "1" ? false :true );
                }else{
                    $scope.needHidePriceValue = true;
                }
            });
        }else{
            $scope.needHideGrandchildFeeTypeValue = true;
            $scope.needHidePriceValue = true;
            $scope.priceValue = ""
        }
    };
    $scope.grandchildFeeTypeValueChanged = function(){
        $scope.priceValue = ""
        if(angular.isObject($scope.grandchildFeeTypeValue)){
            $scope.needHidePriceValue = ($scope.grandchildFeeTypeValue.dremark == "1" ? false :true );
        }else{
            $scope.needHidePriceValue = true;
        }
    };

    var formValidate = function () {
        if($scope.toolForm.$invalid){
            if($scope.toolForm.feeTypeValue.$invalid){
                toasterService.popMessage("费用类型必填");
            }
            if($scope.toolForm.childFeeTypeValue.$invalid){
                toasterService.popMessage("费用类型必填");
            }
            if($scope.toolForm.grandchildFeeTypeValue.$invalid){
                toasterService.popMessage("费用类型必填");
            }

            if($scope.toolForm.priceValue.$invalid){
                if($scope.toolForm.priceValue.$error.required){
                    toasterService.popMessage("请填写标的额(人民币)");
                }
                if($scope.toolForm.priceValue.$error.min){
                    toasterService.popMessage("请填写大于0的数值");
                }
            }
            return false;
        }else{
            return true;
        }
    }

    $scope.calc = function(){
        if(formValidate() == false)
            return;
        if($scope.toolForm.$valid) {
            var costsCode = "";
            if($scope.needHideGrandchildFeeTypeValue == true){
                costsCode = $scope.childFeeTypeValue.dcode;
            }else{
                costsCode = $scope.grandchildFeeTypeValue.dcode;
            }
            var sAddress = appConfig.serverAddress + "toolcosts!getResult.action?amount=" + $scope.priceValue +"&costsCode=" +  costsCode;
            $scope.promise = $http.get(sAddress).success(function(data) {
                $scope.showResult = true;
//                $scope.showContent = data.content !="" ? true:false;
                $scope.showContent = true;

                $scope.showFormula = true;

                $scope.resultData = data.result;
                $scope.formulaData = data.formula;
                $scope.contentData = data.contentName;

                $scope.showFormula = data.formula !="" ? true:false;
                $scope.content = data.content;
            });
        }
    };

    $scope.reset = function(){
        $scope.feeTypeValue = "";
        $scope.childFeeTypeValue = "";
        $scope.grandchildFeeTypeValue = "";

        $scope.childFeeTypes = [];
        $scope.grandchildFeeTypes = [];
        $scope.needHideGrandchildFeeTypeValue = true;
        $scope.needHidePriceValue = true;
        clearData();

    };

    $scope.open = function () {

    };

    $scope.judgeDisabled = function(){
        var i = (angular.isObject($scope.feeTypeValue));
        var j = (angular.isObject($scope.childFeeTypeValue));
        var k = ($scope.grandchildFeeTypes.length > 1 && angular.isObject($scope.grandchildFeeTypeValue));
        var p = ($scope.grandchildFeeTypes.length <= 1);
        var l = ($scope.priceValue != "");

        return !(i &&j && l && (k || p));
    };
}]);

//仲裁费
helpApp.controller('arbitrationFeeController',['$scope','$http','appConfig','$modal','toasterService',function($scope,$http,appConfig,$modal,toasterService){
    $scope.caseTypeValue = "";
    $scope.groupTypeValue = "";
    $scope.priceValue = "";
    $scope.promise = null;
    $scope.promise = $http.get(appConfig.serverAddress + 'toolarbitrationfees!getArbJson.action?parentid=0').success(function(data1) {
        $scope.groupTypes = data1;
    });

    var formValidate = function () {
        if($scope.toolForm.$invalid){
            if($scope.toolForm.groupTypeValue.$invalid){
                toasterService.popMessage("请选择仲裁机构");
            }
            if($scope.toolForm.caseTypeValue.$invalid){
                toasterService.popMessage("请选择案件类型");
            }
            if($scope.toolForm.priceValue.$invalid){
                if($scope.toolForm.priceValue.$error.required){
                    toasterService.popMessage("请填写争议金额(人民币)");
                }
                if($scope.toolForm.priceValue.$error.min){
                    toasterService.popMessage("请填写大于0的数值");
                }
            }
            return false;
        }else{
            return true;
        }
    }

    $scope.calc = function(){
        if(formValidate() == false)
            return;
        if($scope.toolForm.$valid){
            var arbcode = $scope.groupTypeValue.dcode;
            var caseType = $scope.caseTypeValue.dcode;
            var amount = $scope.priceValue;

            var sAddress = appConfig.serverAddress + "toolarbitrationfees!getResult.action?arbcode="+arbcode+"&caseType="+caseType +"&amount="+amount;
            $scope.promise = $http.get(sAddress).success(function(data) {
                $scope.showResult = true;
//                $scope.showContent = data.content !="" ? true:false;
                $scope.showContent = true;

                $scope.showFormula = true;

                $scope.resultData = data.result;
                $scope.formulaData = data.formula;
                $scope.contentData = data.contentName;
                $scope.showFormula = data.formula !="" ? true:false;
                $scope.content = data.content;

            });
        }
    };

    $scope.open = function () {

    };

    var clearData = function(){
        $scope.showResult = false;
        $scope.showFormula = false;
        $scope.showContent = false;

        $scope.resultData = "";
        $scope.formulaData = "";
        $scope.contentData = "";

        $scope.priceValue = "";
    };

    $scope.groupTypeValueChanged = function(){
        clearData();
        $scope.promise = $http.get(appConfig.serverAddress + 'toolarbitrationfees!getCaseJson.action?parentid='+$scope.groupTypeValue.dcode).success(function(data2) {
            $scope.caseTypes = data2;
        });

    };

    $scope.caseTypeValueChanged = function(){
        clearData();
    };

    $scope.reset = function(){
        $scope.groupTypeValue = "";
        $scope.caseTypeValue = "";
        $scope.priceValue = "";
    };

    $scope.judgeDisabled = function(){
        var i = (angular.isObject($scope.groupTypeValue));
        var j = (angular.isObject($scope.caseTypeValue));
        var l = ($scope.priceValue != "");

        return !(i &&j && l);
    };
}]);

//经济补偿金
helpApp.controller('economicCompensationController',['$scope','$http','$filter','appConfig','$modal','toasterService',function($scope,$http,$filter,appConfig,$modal,toasterService){

    $scope.promise = null;
    $scope.promise = $http.get(appConfig.serverAddress + 'toolcompensation!getPveJson.action?parentid=0').success(function(data) {
        $scope.proviences = data.rows;
    });

    $scope.areaTypes = [];

    $scope.showSpecAverageSalary = false;
    $scope.specAverageSalary = ""

    $scope.provienceTypeValue = "";
    $scope.areaTypeValue ="";
    //$scope.hireDateValue = $filter('date')(new Date(),'yyyy-MM-dd');;
    //$scope.leaveDateValue = $filter('date')(new Date(),'yyyy-MM-dd');;
    $scope.hireDateValue = new Date();
    $scope.leaveDateValue = new Date();

    $scope.monthAverageValue = "";
    $scope.showExtraInfo = false;

    $scope.provienceTypeValueChanged = function(){
        $scope.areaTypes = [];
        clearData();
        if(angular.isObject($scope.provienceTypeValue)){
            var address =  appConfig.serverAddress + "toolcompensation!getCityJson.action?pveid="+$scope.provienceTypeValue.id;
            $scope.promise = $http.get(address).success(function(data) {
                $scope.areaTypes = data.rows;
            });
        }
    };

    $scope.judgeDisabled = function(){
        var i = angular.isObject($scope.provienceTypeValue);
        var j = angular.isObject($scope.areaTypeValue);
        return !(i && j);

    };

    $scope.areaTypeValueChanged = function(){
        clearData();
        if(angular.isObject($scope.areaTypeValue) && $scope.leaveDateValue != ""){
            var leaveDateValue =  $filter('date')($scope.leaveDateValue,'yyyy-MM-dd');
            var address = appConfig.serverAddress + "/toolcompensation!getSalaryJson.action?cityid="+$scope.areaTypeValue.id+"&endDate="+leaveDateValue;
            $scope.promise = $http.get(address).success(function(data) {
                if(data.errorCode == '000000'){
                    $scope.showSpecAverageSalary = true;
                    $scope.specAverageSalary = data.formuladesc;
                }
            });
        }
    };

    $scope.hireDateValueChanged = function () {
        var leaveDate = $scope.leaveDateValue;
        var hireDate = $scope.hireDateValue;
        if(hireDate > leaveDate){
            toasterService.popMessage("入职日期需小于离职日期");
        }
    }
    
    $scope.leaveDateValueChanged = function(){
        var leaveDate = $scope.leaveDateValue;
        var hireDate = $scope.hireDateValue;
        if(leaveDate < hireDate){
            toasterService.popMessage("离职日期需大于入职日期");
        }
        clearData();
        if(angular.isObject($scope.areaTypeValue) && $scope.leaveDateValue != ""){
            var leaveDateValue =  $filter('date')($scope.leaveDateValue,'yyyy-MM-dd');
            var address = appConfig.serverAddress + "/toolcompensation!getSalaryJson.action?cityid="+$scope.areaTypeValue.id+"&endDate="+leaveDateValue;
            $scope.promise = $http.get(address).success(function(data) {
                if(data.errorCode == '000000'){
                    $scope.showSpecAverageSalary = true;
                    $scope.specAverageSalary = data.formuladesc;
                }
            });
        }
    };
    var formValidate = function () {
        var leaveDate = $scope.leaveDateValue;
        var hireDate = $scope.hireDateValue;

        if(leaveDate < hireDate){
            toasterService.popMessage("离职日期需大于入职日期");
            return false;
        }
        if($scope.myForm.$invalid){
            if($scope.myForm.provienceTypeValue.$invalid){
                toasterService.popMessage("请选择省份");
            }
            if($scope.myForm.areaTypeValue.$invalid){
                toasterService.popMessage("请选择地区");
            }
            if($scope.myForm.hireDateValue.$invalid){
                if($scope.myForm.hireDateValue.$error.required){
                    toasterService.popMessage("请填写入职时间");
                }
                if($scope.myForm.hireDateValue.$error.date){
                    toasterService.popMessage("请填写有效时间");
                }
            }
            if($scope.myForm.leaveDateValue.$invalid){
                if($scope.myForm.leaveDateValue.$error.required){
                    toasterService.popMessage("请填写离职时间");
                }
                if($scope.myForm.leaveDateValue.$error.date){
                    toasterService.popMessage("请填写有效时间");
                }
            }
            if($scope.myForm.monthAverageValue.$invalid){
                if($scope.myForm.monthAverageValue.$error.required){
                    toasterService.popMessage("请填写月平均工资");
                }
                if($scope.myForm.monthAverageValue.$error.min){
                    toasterService.popMessage("请填写大于0的数值");
                }
            }

            return false;
        }else{
            return true;
        }
    }
    $scope.calc = function(){
        if(formValidate() == false)
        return;
        if($scope.myForm.$valid){
            var beginDate = $filter('date')($scope.hireDateValue,'yyyy-MM-dd');
            var endDate =  $filter('date')($scope.leaveDateValue,'yyyy-MM-dd');
            var amount  = $scope.monthAverageValue;
            var cityid = $scope.areaTypeValue.id;

            var sAddress = appConfig.serverAddress + "toolcompensation!getResult.action?beginDate="+beginDate+"&endDate="+ endDate + "&amount="+ amount + "&cityid=" + cityid;
            $scope.promise = $http.get(sAddress).success(function(data) {
                $scope.showResult = true;
//                $scope.showContent = data.content !="" ? true:false;
                $scope.showContent = true;

                $scope.showFormula = true;

                $scope.resultData = data.result;
                $scope.formulaData = data.formula;
                $scope.contentData = data.contentName;
                $scope.showFormula = data.formula !="" ? true:false;
                $scope.content = data.content;
                $scope.showExtraInfo = true;

            });
        }
    };
    $scope.open = function () {

    };

    $scope.reset = function(){
        $scope.provienceTypeValue = "";
        $scope.areaTypeValue ="";
        $scope.hireDateValue = new Date();
        $scope.leaveDateValue = new Date();
        $scope.monthAverageValue = "";
        $scope.showExtraInfo = false;
        $scope.showSpecAverageSalary = false;
        $scope.specAverageSalary = ""
    };

    var clearData = function(){
        $scope.showResult = false;
        $scope.showFormula = false;
        $scope.showContent = false;

        $scope.showSpecAverageSalary = false;
        $scope.specAverageSalary = ""

        $scope.resultData = "";
        $scope.formulaData = "";
        $scope.contentData = "";

        $scope.monthAverageValue = "";
        $scope.showExtraInfo = false;

    };
}]);

//交通事故赔偿
helpApp.controller('trafficAccidentController',['$scope','$http','appConfig','$modal','toasterService',function($scope,$http,appConfig,$modal,toasterService){

    $scope.promise = null;
    $scope.promise = $http.get(appConfig.serverAddress + 'tooltrafficacfc!getPveJson.action?parentid=0').success(function(data) {
        $scope.proviences = data.rows;
    });
    $scope.promise = $http.get(appConfig.serverAddress + 'tooltrafficacfc!getBicJson.action?parentid=0').success(function(data) {
        $scope.disabledLevels = data.rows;
    });
    $scope.promise = $http.get(appConfig.serverAddress + 'tooltrafficacfc!getHUKOUJson.action?parentid=0').success(function(data) {
        $scope.householdTypes = data.rows;
    });



    $scope.ckWuGongChanged = function(){
        $scope.incomeValue = "";
        $scope.periodValue = "";
    };

    $scope.ckCanJiChanged = function(){
        $scope.disabledLevelValue = "";
        $scope.ageValue = "";
    };

    $scope.open = function () {
        //$modal({title: '交通事故赔偿标准', show: true});

        $modal({template: 'modalTemplate.html',show: true,content: $scope.content,"html":true,});
        //$modal({title: '交通事故赔偿标准', content: $scope.content,"html":true, show: true});
    };

    var formValidate = function () {
        if($scope.toolForm.$invalid){
            if($scope.toolForm.provienceTypeValue.$invalid){
                toasterService.popMessage("请选择地区");
            }
            if($scope.toolForm.householdTypeValue.$invalid){
                toasterService.popMessage("请选择户口类型");
            }
            if($scope.toolForm.disabledLevelValue.$invalid){
                toasterService.popMessage("请选择伤残等级");
            }
            if($scope.toolForm.ageValue.$invalid){
                if($scope.toolForm.ageValue.$error.required){
                    toasterService.popMessage("请填写年龄");
                }
                if($scope.toolForm.ageValue.$error.min){
                    toasterService.popMessage("请填写大于0的数值");
                }
            }
            if($scope.toolForm.cJAgeValue.$invalid){
                if($scope.toolForm.cJAgeValue.$error.required){
                    toasterService.popMessage("请填写年龄");
                }
                if($scope.toolForm.cJAgeValue.$error.min){
                    toasterService.popMessage("请填写大于0的数值");
                }
            }

            if($scope.toolForm.incomeValue.$invalid){
                if($scope.toolForm.incomeValue.$error.required){
                    toasterService.popMessage("误工月收入:元/月");
                }
                if($scope.toolForm.incomeValue.$error.min){
                    toasterService.popMessage("请填写大于0的数值");
                }
            }
            if($scope.toolForm.periodValue.$invalid){
                if($scope.toolForm.periodValue.$error.required){
                    toasterService.popMessage("请填写误工时间:月");
                }
                if($scope.toolForm.periodValue.$error.min){
                    toasterService.popMessage("请填写大于0的数值");
                }
            }
            return false;
        }else{
            return true;
        }
    }
    var judgeDisabled = function(){
        var i = formValidate();

        var k = ($scope.ckWuGong || $scope.ckCanJi || $scope.ckSangZang || $scope.ckSiWang);


        return !(i && k );
    };

    $scope.calc = function(){
        if(judgeDisabled() == true){
            return;
        }
        if(angular.isObject($scope.provienceTypeValue) && angular.isObject($scope.householdTypeValue)){
            var cityId = $scope.provienceTypeValue.id;
            var accountType = $scope.householdTypeValue.dcode;
            var age = $scope.ageValue;
            var disabilityLevel = angular.isObject($scope.disabledLevelValue) ? $scope.disabledLevelValue.dremark : "";
            var income = $scope.incomeValue;
            var tardiness = $scope.periodValue;

            var type =[];
            if($scope.ckCanJi){
                type.push('3');
            }
            if($scope.ckSiWang){
                type.push('4');
            }
            if($scope.ckSangZang){
                type.push('5');
            }
            if($scope.ckWuGong){
                type.push('6');
            }

            var sType = type.toString();
            var sAddress = appConfig.serverAddress + "tooltrafficacfc!getResult.action?";
            sAddress += "cityId="+cityId;
            sAddress += "&accountType="+accountType;
            sAddress += "&age="+age;
            sAddress += "&disabilityLevel="+disabilityLevel;
            sAddress += "&income="+income;
            sAddress += "&tardiness="+tardiness;
            sAddress += "&type="+sType;

            $scope.promise = $http.get(sAddress).success(function(data) {
                $scope.showResult = true;
                $scope.showContent = data.content !="" ? true:false;
                $scope.showFormula = true;

                $scope.resultData = data.result;
                $scope.formulaData = data.formula;
                $scope.contentData = "交通事故赔偿标准";
                $scope.showFormula = data.formula !="" ? true:false;
                $scope.content = data.content;

            });
        }
    };

    $scope.reset = function(){

        $scope.provienceTypeValue = "";
        $scope.householdTypeValue = "";

        clearData();
    };

    $scope.provienceTypeValueChanged = function(){
        clearData();
    };

    $scope.householdTypeValueChanged = function(){
        clearData();
    };

    $scope.ckSiWangChanged = function(){
        $scope.ageValue = "";
    };

    var clearData = function(){
        $scope.showResult = false;
        $scope.showFormula = false;
        $scope.showContent = false;

        $scope.resultData = "";
        $scope.formulaData = "";
        $scope.contentData = "";

        $scope.ageValue = "";
        $scope.incomeValue = ""
        $scope.periodValue = "";

        $scope.ckCanJi = false;
        $scope.ckSiWang = false;
        $scope.ckSangZang = false;
        $scope.ckWuGong = false;
        $scope.disabledLevelValue = "";
    };
}]);

//利息计算
helpApp.controller('interestRateController',['$scope','$http','$filter','appConfig','toasterService',function($scope,$http,$filter,appConfig,toasterService){
    $scope.startDateValue = new Date();
    $scope.endDateValue = new Date();

    $scope.isLoan = true;
    $scope.isDeposit = false;

    $scope.amountValue = "";
    $scope.rateTypeValue = "";
    $scope.depositTypeValue = "0";
    $scope.rateDesc = "银行年利率：";
    $scope.rateValue = 1
    $scope.promise = null;
    if($scope.isLoan){
        $scope.amountDesc = "本金：元";
    }else{
        $scope.amountDesc = "存款金额：元";
    }

    $scope.loanClicked = function(){
        //贷款
        $scope.isDeposit = false;
        $scope.isLoan = true;
        clearData();
        $scope.rateTypeValue = "";
        $scope.amountValue = "";
        $scope.depositTypeValue = "0";
        $scope.startDateValue =  new Date();
        $scope.endDateValue =  new Date();

        if($scope.isLoan){
            $scope.amountDesc = "本金：元";
        }else{
            $scope.amountDesc = "存款金额：元";
        }
    }

    $scope.depositClicked = function () {
        //存款
        $scope.isDeposit = true;
        $scope.isLoan = false;
        clearData();
        $scope.rateTypeValue = "";
        $scope.amountValue = "";
        $scope.depositTypeValue = "0";
        $scope.startDateValue =  new Date();
        $scope.endDateValue =  new Date();

        if($scope.isLoan){
            $scope.amountDesc = "本金：元";
        }else{
            $scope.amountDesc = "存款金额：元";
        }
    }

    $scope.rateTypeValueChanged = function(){
        clearData();
        switch ($scope.rateTypeValue){
            case "0":
            case "1":
                $scope.rateDesc = "倍率:";

                break;
            case "2":
            case "3":
            case "4":
                $scope.rateDesc = "约定利率：";

                break;
            default :
                $scope.rateDesc = "倍率:";
        }
    };

    $scope.startDateValueChange = function () {
        if($scope.startDateValue > $scope.endDateValue){
            toasterService.popMessage("起算日期需小于截止日期");
        }
    }

    $scope.endDateValueChange = function () {
        if($scope.endDateValue < $scope.startDateValue){
            toasterService.popMessage("截止日期需大于起算日期");
        }

    }
    var formValidate = function () {

        if($scope.endDateValue < $scope.startDateValue){
            toasterService.popMessage("截止日期需大于起算日期");
            return false;
        }
        if($scope.myForm.$invalid){
            if($scope.myForm.rateTypeValue.$invalid){
                toasterService.popMessage("请选择利率");
            }
            if($scope.myForm.startDateValue.$invalid){
                if($scope.myForm.startDateValue.$error.required){
                    toasterService.popMessage("请填写起算日期");
                }
                if($scope.myForm.startDateValue.$error.date){
                    toasterService.popMessage("请填写有效时间");
                }
            }
            if($scope.myForm.endDateValue.$invalid){
                if($scope.myForm.endDateValue.$error.required){
                    toasterService.popMessage("请填写截止日期");
                }
                if($scope.myForm.endDateValue.$error.date){
                    toasterService.popMessage("请填写有效时间");
                }
            }
            if($scope.myForm.amountValue.$invalid){
                if($scope.myForm.amountValue.$error.required){
                    toasterService.popMessage($scope.amountDesc);
                }
                if($scope.myForm.amountValue.$error.pattern){
                    toasterService.popMessage("请填写有效数值");
                }
            }
            return false;
        }else{
            return true;
        }
    }
    $scope.calc = function(){

        if(formValidate() == false){
            return;
        }
        if($scope.myForm.$valid){
            if($scope.isLoan){
                var ratetype = '0';
            }
            if($scope.isDeposit){
                var ratetype = '1';
            }
            var savingstype = $scope.depositTypeValue;
            var begindate  = $filter('date')($scope.startDateValue,'yyyy-MM-dd');
            var enddate = $filter('date')($scope.endDateValue,'yyyy-MM-dd');
            var principle = $scope.amountValue;
            var sectortype = $scope.rateTypeValue;

            var rate = $scope.rateValue;
            var yearrate = $scope.rateValue;

            var sAddress = appConfig.serverAddress + "toolloan!getResult.action?";
            sAddress += "ratetype="+ratetype;
            sAddress += "&savingstype="+savingstype;
            sAddress += "&begindate="+begindate;
            sAddress += "&enddate="+enddate;
            sAddress += "&principle="+principle;
            sAddress += "&sectortype="+sectortype;
            sAddress += "&rate="+rate;
            sAddress += "&yearrate="+yearrate;


            $scope.promise = $http.get(sAddress).success(function(data) {
                $scope.showResult = true;
                $scope.showContent = true;

                $scope.resultData = data.result;
                $scope.formulaData = data.formula;
                $scope.contentData = data.contentName;
                $scope.showFormula = data.formula !="" ? true:false;

            });
        }
    };

    var clearData = function(){
        $scope.showResult = false;
        $scope.showFormula = false;
        $scope.showContent = false;

        $scope.resultData = "";
        $scope.formulaData = "";
        $scope.contentData = "";

        $scope.rateValue = 1;
        $scope.rateDesc = "倍率：";

    };

    $scope.reset = function(){
        $scope.isLoan = true;
        $scope.isDeposit = false;
        $scope.amountDesc = "本金：元";
        $scope.rateTypeValue = "";
        $scope.amountValue = "";
        $scope.depositTypeValue = "0";
        $scope.startDateValue =  new Date();
        $scope.endDateValue =  new Date();

        clearData();
    };
}]);

helpApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance) {

    $scope.ok = function () {
        $modalInstance.close();
    };

});


