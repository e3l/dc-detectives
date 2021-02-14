// App that interfaces with the federal register site

const GET_ORDERS_COUNT = 25;

const fetch = require('node-fetch');

async function getLatestExecutiveOrders(numOrders) {
    if (!numOrders) numOrders = GET_ORDERS_COUNT;

    try {
        let response = await fetch(`https://www.federalregister.gov/api/v1/documents.json?per_page=${numOrders}&conditions%5Btype%5D%5B%5D=PRESDOCU&conditions%5Bpresidential_document_type%5D%5B%5D=executive_order`);
        let ordersList = await response.json();

        // console.log(ordersList);

        return ordersList;
    } catch (e) {
        console.log(e);
        return;
    }
}

// get order from id
async function getExecutiveOrder(orderNumber) {
    try {
        let response = await fetch(`https://www.federalregister.gov/api/v1/documents/${orderNumber}.json?fields%5B%5D=&fields%5B%5D=abstract&fields%5B%5D=action&fields%5B%5D=agencies&fields%5B%5D=agency_names&fields%5B%5D=body_html_url&fields%5B%5D=cfr_references&fields%5B%5D=citation&fields%5B%5D=comment_url&fields%5B%5D=comments_close_on&fields%5B%5D=correction_of&fields%5B%5D=corrections&fields%5B%5D=dates&fields%5B%5D=disposition_notes&fields%5B%5D=docket_id&fields%5B%5D=docket_ids&fields%5B%5D=document_number&fields%5B%5D=effective_on&fields%5B%5D=end_page&fields%5B%5D=excerpts&fields%5B%5D=executive_order_notes&fields%5B%5D=executive_order_number&fields%5B%5D=full_text_xml_url&fields%5B%5D=html_url&fields%5B%5D=images&fields%5B%5D=json_url&fields%5B%5D=mods_url&fields%5B%5D=page_length&fields%5B%5D=page_views&fields%5B%5D=pdf_url&fields%5B%5D=president&fields%5B%5D=presidential_document_number&fields%5B%5D=proclamation_number&fields%5B%5D=public_inspection_pdf_url&fields%5B%5D=publication_date&fields%5B%5D=raw_text_url&fields%5B%5D=regulation_id_number_info&fields%5B%5D=regulation_id_numbers&fields%5B%5D=regulations_dot_gov_info&fields%5B%5D=regulations_dot_gov_url&fields%5B%5D=significant&fields%5B%5D=signing_date&fields%5B%5D=start_page&fields%5B%5D=subtype&fields%5B%5D=title&fields%5B%5D=toc_doc&fields%5B%5D=toc_subject&fields%5B%5D=topics&fields%5B%5D=type&fields%5B%5D=volume
        `);
        let order = await response.json();

        return order;
    } catch (err) {
        console.log(err);
        return null;
    }
}

module.exports = { getLatestExecutiveOrders, getExecutiveOrder };