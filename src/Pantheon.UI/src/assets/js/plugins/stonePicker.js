// jinhduong :v:v:v
(function (window, $, undefined) {
    $.fn.stonePicker = function (config) {

        var defaultConfig = {
            data: [], // {id:1, text:'123', selected:true}
            defaulItems: [],
            multi: false,
            textfield: 'text',
            valuefield: 'id',
            defaultClass: 'jq-stone-default',
            selectedClass: 'jq-stone-selected',
            stoneTemplate: $.noop,
            change: $.noop,
            vertical: false
        };

        var self = this;
        var $selector = $(this);
        var selfData = {
            choose: {},
            items: []
        };

        //Remove all before init items
        //$selector.children().remove();

        selfData.getChoose = function () {
            var result = [];
            Object.keys(selfData.choose).forEach(prop => {
                if (selfData.choose[prop] === true) {
                    result.push(prop);
                }
            });
            return result;
        }

        // Extend config
        config = $.extend(defaultConfig, config);

        // Set default choosing
        //
        config.defaulItems.forEach(prop => selfData.choose[prop] = true);

        $selector.data('stonePicker', selfData);
        //
        config.data.forEach(item => {
            var $stone;

            // Custom template
            if (config.stoneTemplate !== $.noop) {
                $stone = config.stoneTemplate(item);
            }
            else {
                $stone = $('<div>');
            }
            //

            $stone.append($('<span>').text(item[config.textfield]))
                .attr('choosed', item.selected || selfData[item[config.valuefield]] || false)
                .attr('value', item[config.valuefield])
                .addClass('jq-stone-picker')
                .addClass(item.selected || selfData[item[config.valuefield]] ? config.selectedClass : config.defaultClass);

            if (config.vertical) {
                $stone.css('display', 'inline-block');
            }

            // Store jquery stone items    
            selfData.items.push($stone);

            if (item.selected) {
                selfData.choose[item.id] = true;
            }

            $stone.on('click', function () {
                
                var choosed = $stone.attr('choosed') === "true";

                // Bind Change event
                // Single checking
                if (!config.multi) {

                    if (!choosed) {

                        setValueToStone($stone, !choosed);

                        //Update selected prop
                        item.selected = !choosed;

                        config.change({ item: item, elem: $stone,config: config, component: selfData });

                        // Disable rest of items when mode 'not multi'
                        if (!config.multi) {
                            selfData.items.forEach($item => {
                                if ($item != $stone) {
                                    setValueToStone($item, false);
                                }
                            })
                        }
                    }
                } else { //Multi checking
                    setValueToStone($stone, !choosed);

                    //Update selected prop
                    item.selected = !choosed;

                    config.change({ item: item, elem: $stone, config: config, component: selfData });
                }
            });

            function setValueToStone($elem, value = false) {

                //Update data
                $elem.attr('choosed', value);
                selfData.choose[$elem.attr('value')] = value;

                //UI
                if (value) {
                    $elem.removeClass(config.defaultClass)
                        .addClass(config.selectedClass);
                }
                else {
                    $elem.removeClass(config.selectedClass)
                        .addClass(config.defaultClass);
                }
            }

            $selector.append($stone);
        });
    }
} (window, jQuery));