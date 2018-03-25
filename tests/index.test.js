fixture("Index").page("http://localhost:8080");

test("Navigation: Logo", async t => {
    await t.setNativeDialogHandler(() => true)
        .click("nav .title a");

    const location = await t.eval(() => window.location);

    await t.expect(location.pathname).eql("/");
});

test("Footer: Correct date", async t => {
    const year = await t.eval(() => $(".copyright-year").get(0).textContent);

    await t.expect(year).eql((new Date()).getFullYear().toString())
});