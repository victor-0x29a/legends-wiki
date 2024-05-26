import { Box, Heading } from '@chakra-ui/react';
import MDEditor from '@uiw/react-md-editor';
import { LegendsSize } from '../../../styles/constants.style';
import { useContext } from 'react';
import { I18nContext } from '../../../contexts/i18n.context';
import { FormLabels } from '../../../i18n/forms.i18n';

interface IEntityFormSectionsProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange: (value: any) => void,
    value: string,
    isLoading?: boolean
}

export const EntityFormSections = ({
    onChange,
    value,
    isLoading = false
}: IEntityFormSectionsProps) => {
    const { translate } = useContext(I18nContext)

    return (
        <Box>
            <Heading
                size={"md"}
                marginTop={LegendsSize.margin.normal}
                marginBottom={LegendsSize.margin.small}
            >
                {translate(FormLabels, "Sections")}
            </Heading>
            {!isLoading && (
                <MDEditor
                    onChange={onChange}
                    value={value}
                    id='entity-sections-input'
                />
            )}
        </Box>
    )
}
