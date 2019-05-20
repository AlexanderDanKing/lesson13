describe("Таймер", function(){
    it("Возвращает ли функция объект?", function(){
        assert.typeOf(getTimeRemaining(), "object");
    });

    it("Устанавливаем таймер обратного отсчета", function(){
        assert.typeOf(setClock("timer", deadline), "string");
    });

    describe("Общая сумма", function(){
        it("Изначально равен нулю", function(){
            assert.equal(total, 0);
        });
    });
});