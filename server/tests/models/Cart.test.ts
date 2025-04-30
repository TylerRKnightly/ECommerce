import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Cart, { ICart } from '../../src/models/Cart';

describe('Cart Model', () => {
    let mongoServer: MongoMemoryServer;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri);
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    afterEach(async () => {
        await Cart.deleteMany({});
    });

    it('should create and save a cart successfully', async () => {
        const cartData: Partial<ICart> = {
            user: new mongoose.Types.ObjectId(),
            items: [
                {
                    product: new mongoose.Types.ObjectId(),
                    qty: 2,
                },
            ],
        };

        const cart = new Cart(cartData);
        const savedCart = await cart.save();

        expect(savedCart._id).toBeDefined();
        expect(savedCart.user).toEqual(cartData.user);
        expect(savedCart.items.length).toBe(1);
        expect(savedCart.items[0].product).toEqual(cartData.items![0].product);
        expect(savedCart.items[0].qty).toBe(cartData.items![0].qty);
    });

    it('should fail to create a cart without required fields', async () => {
        const cart = new Cart({});
    
        let error: any;
        try {
            await cart.save();
        } catch (err) {
            error = err as any;
        }
    
        expect(error).toBeDefined();
        expect(error.name).toBe('ValidationError');
    });
    
    it('should enforce unique user constraint', async () => {
        const userId = new mongoose.Types.ObjectId();
    
        const cart1 = new Cart({
            user: userId,
            items: [
                {
                    product: new mongoose.Types.ObjectId(),
                    qty: 1,
                },
            ],
        });
    
        const cart2 = new Cart({
            user: userId,
            items: [
                {
                    product: new mongoose.Types.ObjectId(),
                    qty: 2,
                },
            ],
        });
    
        await cart1.save();
    
        await cart2.save().catch(err => {
            expect(err).toBeDefined();
            expect(err.code).toBe(11000);
        });
    });
    
    it('should fail to save an item with qty less than 1', async () => {
        const cartData: Partial<ICart> = {
            user: new mongoose.Types.ObjectId(),
            items: [
                {
                    product: new mongoose.Types.ObjectId(),
                    qty: 0,
                },
            ],
        };
    
        const cart = new Cart(cartData);
    
        let error: any;
        try {
            await cart.save();
        } catch (err) {
            error = err as any;
        }
    
        expect(error).toBeDefined();
        expect(error.name).toBe('ValidationError');
    });
});