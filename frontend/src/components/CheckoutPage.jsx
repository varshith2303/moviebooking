import RazorpayButton from "./RazorpayButton";

function CheckoutPage() {
  return (
    <div>
      <h2>Buy Product</h2>
      <RazorpayButton amount={500} /> {/* ₹500 */}
    </div>
  );
}

export default CheckoutPage;