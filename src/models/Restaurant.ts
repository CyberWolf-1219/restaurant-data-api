import mongoose, { Document, Schema } from 'mongoose';

interface IRestaurant extends Document {
  name: string;
  address: {
    street: string;
    city: string;
    country: string;
  };
  contacts: {
    phone: string;
    email: string;
  };
  ratings: {
    userID: string;
    rating: number;
  }[];
  rating: number;
  menu: {
    name: string;
    price: number;
  }[];
  schedule: {
    monday: {
      opensAt: string;
      closesAt: string;
    };
    tuesday: {
      opensAt: string;
      closesAt: string;
    };
    wednesday: {
      opensAt: string;
      closesAt: string;
    };
    thirsday: {
      opensAt: string;
      closesAt: string;
    };
    friday: {
      opensAt: string;
      closesAt: string;
    };
    saturday: {
      opensAt: string;
      closesAt: string;
    };
    sunday: {
      opensAt: string;
      closesAt: string;
    };
  };
}

const RestaurantSchema: Schema<IRestaurant> = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  contacts: {
    phone: {
      type: String,
      validate: (value: string) => {
        return /\+?\d{10,11}/.test(value);
      },
      required: true,
    },
    email: {
      type: String,
      validate: (value: string) => {
        return /^[^\s@]+\@[^\s@]+\.[^\s@]+$/.test(value);
      },
      required: true,
    },
  },
  rating: { type: Number, required: true },
  menu: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
    },
  ],
  schedule: {
    monday: {
      opensAt: { type: String, required: true },
      closesAt: { type: String, required: true },
    },
    tuesday: {
      opensAt: { type: String, required: true },
      closesAt: { type: String, required: true },
    },
    wednesday: {
      opensAt: { type: String, required: true },
      closesAt: { type: String, required: true },
    },
    thirsday: {
      opensAt: { type: String, required: true },
      closesAt: { type: String, required: true },
    },
    friday: {
      opensAt: { type: String, required: true },
      closesAt: { type: String, required: true },
    },
    saturday: {
      opensAt: { type: String, required: true },
      closesAt: { type: String, required: true },
    },
    sunday: {
      opensAt: { type: String, required: true },
      closesAt: { type: String, required: true },
    },
  },
});

export default mongoose.model<IRestaurant>('Restaurant', RestaurantSchema);
