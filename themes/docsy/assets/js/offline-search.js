// Adapted from code by Matt Walters https://www.mattwalters.net/posts/hugo-and-lunr/

(function ($) {
    'use strict';

    $(document).ready(function () {
        const $searchInput = $('.td-search-input');

        //
        // Options for popover
        //

        $searchInput.data('html', true);
        $searchInput.data('placement', 'bottom');
        $searchInput.data(
            'template',
            '<div class="popover offline-search-result" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
        );

        //
        // Register handler
        //

        $searchInput.on('change', (event) => {
            // render($(event.target));

            // // Hide keyboard on mobile browser
            // $searchInput.blur();
        });

        $searchInput.keyup(function(event){
            render($(event.target));
          });

        // Prevent reloading page by enter key on sidebar search.
        $searchInput.closest('form').on('submit', () => {
            return false;
        });

        //
        // Lunr
        //

        let idx = null; // Lunr index
        const resultDetails = new Map(); // Will hold the data for the search results (titles and summaries)

        // Set up for an Ajax call to request the JSON data file that is created by Hugo's build process
        $.ajax($searchInput.data('offline-search-index-json-src')).then(
            (data) => {
                idx = lunr(function () {
                    this.ref('ref');
                    this.field('title', { boost: 2 });
                    this.field('body');

                    data.forEach((doc) => {
                        this.add(doc);
                        resultDetails.set(doc.ref, {
                            title: doc.title,
                            excerpt: doc.excerpt,
                            body: _.truncate(doc.body, {
                                'length': 800,
                                'separator': ' '
                              })
                        });
                    });
                });

                $searchInput.trigger('change');
            }
        );

        const render = ($targetSearchInput) => {
            // Dispose the previous result
            $targetSearchInput.popover('dispose');
            if ( $targetSearchInput.val() === '') {
                $targetSearchInput.popover('hide');
            }
           

            //
            // Search
            //

            if (idx === null) {
                return;
            }

            const searchQuery = $targetSearchInput.val();
            if (searchQuery === '') {
                $targetSearchInput.trigger('change');
                return;
            }

            const results = idx
                .query((q) => {
                    const tokens = lunr.tokenizer(searchQuery.toLowerCase());
                    tokens.forEach((token) => {
                        const queryString = token.toString();
                        q.term(queryString, {
                            boost: 100,
                        });
                        q.term(queryString, {
                            wildcard:
                                lunr.Query.wildcard.LEADING |
                                lunr.Query.wildcard.TRAILING,
                            boost: 10,
                        });
                        q.term(queryString, {
                            editDistance: 2,
                        });
                    });
                })
                .slice(0, 10);

            //
            // Make result html
            //

            const $html = $('<div>');

            $html.append(
                $('<div>')
                    .css({
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '1em',
                    })
                    .append(
                        $('<span>')
                            .text('Search results')
                            .css({ fontWeight: 'bold' })
                    )
                    .append(
                        $('<i>')
                            .addClass('fas fa-times search-result-close-button')
                            .css({
                                cursor: 'pointer',
                            })
                    )
            );

            const $searchResultBody = $('<div>').css({
                maxHeight: `calc(100vh - ${
                    $targetSearchInput.offset().top -
                    $(window).scrollTop() +
                    180
                }px)`,
                overflowY: 'auto',
            });
            $html.append($searchResultBody);

            if (results.length === 0) {
                $searchResultBody.append(
                    $('<p>').text(`No results found for query "${searchQuery}"`)
                );
            } else {
                results.forEach((r) => {
                    const $cardHeader = $('<div>').addClass('card-header');
                    const doc = resultDetails.get(r.ref);
                    const href =
                        $searchInput.data('offline-search-base-href') +
                        r.ref.replace(/^\//, '');

                    $cardHeader.append(
                        $('<a>').attr('href', href).text(doc.title)
                    );

                    const $cardBody = $('<div>').addClass('card-body');
                    $cardBody.append(
                        $('<p>')
                            .addClass('card-text text-muted')
                            .text(doc.body)
                    );

                    const $card = $('<div>').addClass('card');
                    $card.append($cardHeader).append($cardBody);

                    $searchResultBody.append($card);
                });
            }

            $targetSearchInput.on('shown.bs.popover', () => {
                $('.search-result-close-button').on('click', () => {
                    $targetSearchInput.val('');
                    $(".popover-body").hide();
                    
                });
            });

            $targetSearchInput
                .data('content', $html[0].outerHTML)
                .popover('show');
        };
    });
})(jQuery);