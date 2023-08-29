import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  loading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.loading = false;
    },

    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return { payload: { amount, purpose } };
      },
      reducer(state, action) {
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += action.payload.amount;
      },
    },
    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    converting(state) {
      state.loading = true;
    },
  },
});
export default accountSlice.reducer;
export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };
  return async function (dispatch, getState) {
    dispatch({ type: "account/converting" });
    const host = "api.frankfurter.app";
    const res = await fetch(
      `https://${host}/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const {
      rates: { USD: converted },
    } = await res.json();
    console.log(converted);
    dispatch({ type: "account/deposit", payload: converted });
  };
}

// export default function accountReducer(state = initialAccountState, action) {
//   switch (action.type) {
//     case "account/deposit":
//       return {
//         ...state,
//         loading: false,
//         balance: state.balance + action.payload,
//       };

//     case "account/converting":
//       return { ...state, loading: true };
//     case "account/withdraw":
//       return { ...state, balance: state.balance - action.payload };
//     case "account/requestLoan":
//       if (state.loan > 0) return;
//       return {
//         ...state,
//         loan: action.payload.amount,
//         loanPurpose: action.payload.loanPurpose,
//         balance: state.balance + action.payload.amount,
//       };

//     case "account/payLoan":
//       return {
//         ...state,
//         loan: 0,
//         loanPurpose: "",
//         balance: state.balance - state.loan,
//       };

//     default:
//       return state;
//   }
// }

// export function deposit(amount, currency) {
//   if (currency === "USD") return { type: "account/deposit", payload: amount };
//   return async function (dispatch, getState) {
//     dispatch({ type: "account/converting" });
//     const host = "api.frankfurter.app";
//     const res = await fetch(
//       `https://${host}/latest?amount=${amount}&from=${currency}&to=USD`
//     );
//     const {
//       rates: { USD: converted },
//     } = await res.json();
//     console.log(converted);
//     dispatch({ type: "account/deposit", payload: converted });
//   };
// }

// export function withdraw(amount) {
//   return { type: "account/withdraw", payload: amount };
// }

// export function requestLoan(amount, purpose) {
//   return {
//     type: "account/requestLoan",
//     payload: { loanPurpose: purpose, amount: amount },
//   };
// }

// export function payLoan() {
//   return {
//     type: "account/payLoan",
//   };
// }
