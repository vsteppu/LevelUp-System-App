<template>
    <Combobox
		v-model="selectedValue"
		class="relative"
		:class="comboBoxWidth"
		:disabled="isDisabled"
		as="div"
	>
        <div
			class="relative "
			:class="{ 'text-gray-400' : isDisabled }"
		>
            <ComboboxLabel
				v-if="typeof label === 'string'"
			>
                {{label}}
            </ComboboxLabel>

            <ComboboxInput
                @change="query = $event.target.value"
                class="capitalize bg-player-gray shadow-lg shadow-neutral-950 rounded px-4 py-1 w-full"
                :placeholder="placeholder"
                :disabled="disableTyping"
            />

            <ComboboxButton class="absolute inset-y-0 right-1 flex items-center">
                <ChevronDownIcon
                    class="size-4"
                />
            </ComboboxButton>
        </div>

        <ComboboxOptions
            as="div"
            class="z-[9999] border border-player-gray w-full absolute mt-0.5 bg-player-gray shadow-lg shadow-neutral-950 rounded px-2 py-1"
            :class="[
				disableOverflow ? '':'overflow-y-scroll',
				enableDropUpClasses ? 'bottom-11' : '',
				optionsContainerHeight
			]"
        >
            <div
                v-if="filteredOptions.length === 0 && query !== ''"
                class="relative cursor-default select-none py-1 px-2 text-base text-won-dark-blue"
            >
                Nothing found
            </div>

            <ComboboxOption
                v-else
                as="div"
                v-for="option in filteredOptions"
                :key="option?.value || option"
                :value="option?.value || option"
                class="capitalize py-1.5 px-2 hover:bg-neutral-700 cursor-pointer"
            >
                <span
                    class="text-base text-won-dark-blue"
                    v-html="option?.display || option"
                />
            </ComboboxOption>
        </ComboboxOptions>
    </Combobox>
</template>

<script setup>
import { ref, toRefs, computed, watch } from 'vue';
import { ChevronDownIcon } from "@heroicons/vue/24/solid";

import {
    Combobox, ComboboxButton,
    ComboboxInput,
    ComboboxOption,
    ComboboxOptions,
    ComboboxLabel
} from '@headlessui/vue'

const emit = defineEmits(['value:update'])
const props = defineProps({
    options: {
        type: Array,
        default: []
    },
    defaultValue: {
        type: String,
        default: null
    },
    placeholder: {
        type: String,
        default: 'Type to search'
    },
    comboBoxWidth: {
        type: String,
        default: ''
    },
    label: {
        type: String,
        default: null
    },
    highlightQuery: {
        type: Boolean,
        default: false
    },
    disableTyping: {
        type: Boolean,
        default: false
    },
    disableOverflow: {
        type: Boolean,
        default: false
    },
    enableDropUpClasses: {
        type: Boolean,
        default: false
    },
    isDisabled: {
        type: Boolean,
        default: false
    },
	optionsContainerHeight: {
		type: String,
		default: 'max-h-[150px]'
	},
	inputStyle: {
		type: String,
		default: ''
	}
})

const { defaultValue, options, highlightQuery } = toRefs(props);

console.log('label: ', props.label);

const query = ref(null);
const selectedValue = ref(defaultValue.value)

const highlightMatchIn = (str, matchObject) => str.replace(matchObject[0], `<span class="query-match">${matchObject[0]}</span>`);

const filteredOptions = computed(() => {
    if (query.value == null || query.value === '') {
        return options.value
    }

    const searchStr = new RegExp(query.value, 'i');
    const searchResult = [];

    options.value.forEach(val => {
        const match = searchStr.exec(val);

        if (match != null) {
            if (highlightQuery.value) {
                searchResult.push({
                    display: highlightMatchIn(val, match),
                    value: val
                })
            } else {
                searchResult.push(val)
            }
        }
    });

    return searchResult
})

watch(selectedValue, (newValue) => {
    emit('value:update', newValue.key || newValue);
})
</script>

<style>
.query-match {
    text-decoration: underline;
    font-weight: bold;
}
</style>
