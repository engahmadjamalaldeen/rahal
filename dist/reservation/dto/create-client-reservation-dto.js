"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = exports.Operation = exports.CreateClientReservationDto = void 0;
class CreateClientReservationDto {
}
exports.CreateClientReservationDto = CreateClientReservationDto;
var Operation;
(function (Operation) {
    Operation["EQUALS"] = "EQUALS";
    Operation["BIGGER"] = "BIGGER";
    Operation["SMALLER"] = "SMALLER";
    Operation["SMALLER_OR_EQUALS"] = "SMALLER_OR_EQUALS";
    Operation["BIGGER_OR_EQUALS"] = "BIGGER_OR_EQUALS";
})(Operation = exports.Operation || (exports.Operation = {}));
var Status;
(function (Status) {
    Status["pending"] = "pending";
    Status["confirmed"] = "confirmed";
})(Status = exports.Status || (exports.Status = {}));
//# sourceMappingURL=create-client-reservation-dto.js.map