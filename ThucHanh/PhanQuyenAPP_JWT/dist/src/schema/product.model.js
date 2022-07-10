"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        unique: true
    },
    price: Number,
    category: String
});
const Product = mongoose_1.default.model("Product", productSchema);
exports.Product = Product;
//# sourceMappingURL=product.model.js.map