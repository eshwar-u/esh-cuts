function PricesContent() {
  console.log("These are the prices");
  return (
    <>
      <section>
        <h2>Services and Prices</h2>

        <li>
          <strong>Haircut:</strong> $25
        </li>
        <li>
          <strong>Haircut with Beard:</strong> $30
        </li>
        <li>
          <strong>Big Chop:</strong> $30
        </li>
        <li>
          <strong>Clean Up:</strong> $15
        </li>
      </section>

      <section>
        <h2>Location</h2>
        <p>Current Location: West Lafayette, Indiana</p>
      </section>
    </>
  );
}

export default PricesContent;
