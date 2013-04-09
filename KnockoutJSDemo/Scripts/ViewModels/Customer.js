/// <reference path="../jquery-1.8.2.min.js" />
/// <reference path="../knockout-2.2.1.js" />
$(document).ready(function () {
    ko.applyBindings(new customerVM(), document.getElementById('displayNode'));
    ko.applyBindings(new customer(), document.getElementById('createNode'));
});

function customer(id, name, age, comments) {
    var self = this;

    self.Id = id;
    self.Name = name;
    self.Age = age,
        self.Comments = comments;

    self.addCustomer = function () {
        $.ajax({
            url: "/api/customer/",
            type: 'post',
            data: ko.toJSON(this),
            contentType: 'application/json',
            success: function (result) {
            }
        });
    }
}

function customerVM() {
    var self = this;
    self.customers = ko.observableArray([]);
    self.getCustomers = function () {
        self.customers.removeAll();
        $.getJSON("/api/customer/", function (data) {
            $.each(data, function (key, val) {
                self.customers.push(new customer(val.Id, val.Name, val.Age, val.Comments));
            });
        });
    };
}